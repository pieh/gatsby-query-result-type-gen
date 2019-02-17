#!/usr/bin/env node

// TO-DO vertify we are in gatsby directory

process.env.NODE_ENV = `production`
process.env.gatsby_executing_command = `build`

const {
  generateSource: generateTypescriptSource,
} = require("apollo-codegen-typescript")

const { Source, concatAST, parse, buildClientSchema } = require("graphql")

const { introspectionQuery } = require("graphql/utilities")
const fs = require(`fs-extra`)
const path = require(`path`)
const chalk = require(`chalk`)

// yikes
const gatsbyPackageLocation = path.join(process.cwd(), `node_modules`, `gatsby`)

const bootstrap = require(`${gatsbyPackageLocation}/dist/bootstrap`)
const queryQueue = require(`${gatsbyPackageLocation}/dist/internal-plugins/query-runner/query-queue`)
const { store } = require(`${gatsbyPackageLocation}/dist/redux`)
const { graphql } = require(`${gatsbyPackageLocation}/graphql`)

const { compileToIR } = require("apollo-codegen-core/lib/compiler")

const getQueries = async () => {
  console.log("Generating types")

  const { schema: gatsbySchema, components } = store.getState()

  // I hate this - but gatsby graphql module is different than from apollo-codegen-core compiler so
  // serialize and deserialize to avoid "different realm" errors
  const introspectionSchema = await graphql(gatsbySchema, introspectionQuery)
  const schema = buildClientSchema(introspectionSchema.data)

  const sources = []
  components.forEach(componentMeta => {
    sources.push(new Source(componentMeta.query, componentMeta.componentPath))
  })

  const asts = sources
    .filter(source => source.body)
    .map(source => {
      try {
        return parse(source)
      } catch (e) {
        return null
      }
    })
  const document = concatAST(asts)

  const FragmentNames = document.definitions
    .filter(def => def.kind === `FragmentDefinition`)
    .map(def => def.name.value)

  const context = compileToIR(schema, document, {
    mergeInFieldsFromFragmentSpreads: true,
  })

  const typeGeneration = generateTypescriptSource(context)

  const definitionDirectoryFilePath = path.join(
    process.cwd(),
    `src`,
    `query-result-types`
  )

  // for beta let's not try to delete any files ;)
  // await fs.remove(definitionDirectoryFilePath)

  const stripExtension = filePath => filePath.replace(/[.]ts$/g, ``)

  const tsInstructions = []
  const jsdocInstructions = []
  await Promise.all(
    typeGeneration.generatedFiles.map(
      async ({ fileName, content: { output }, sourcePath }) => {
        const importName = stripExtension(fileName)
        if (FragmentNames.includes(importName)) {
          // skip fragments
          return
        }

        const typeOutputFilePath = path.join(
          definitionDirectoryFilePath,
          fileName
        )
        await fs.outputFile(typeOutputFilePath, output)
        const rel = path.relative(
          path.dirname(sourcePath),
          stripExtension(typeOutputFilePath)
        )

        tsInstructions.push(
          `${chalk.dim(`In ${sourcePath}:`)}\n${chalk.green(
            `import { ${importName} } from "${rel}"`
          )}`
        )

        jsdocInstructions.push(
          `${chalk.dim(`In ${sourcePath}:`)}\n${chalk.green(
            `/** @type { import("${rel}").${importName} } */`
          )}`
        )
      }
    )
  )

  console.log()
  console.log(`Done. Types are saved in ${definitionDirectoryFilePath}.`)
  console.log()
  console.log(chalk.bold("Typescript instructions:"))
  console.log()
  console.log(tsInstructions.join(`\n\n`))
  console.log()
  console.log(chalk.bold("VsCode + JsDoc instructions:"))
  console.log()
  console.log(
    `Add ${chalk.green(
      "// @ts-check"
    )} at the top of your file and annotate "data" prop with:`
  )
  console.log()
  console.log(jsdocInstructions.join(`\n\n`))
  console.log()

  process.exit()
}

const run = async () => {
  queryQueue.pause()

  let isFirst = true
  queryQueue.on(`task_queued`, () => {
    if (isFirst) {
      getQueries()
    }
    isFirst = false
  })

  await bootstrap({
    directory: process.cwd(),
    _: [`build`], // wat
  })

  // if for whatever reason we to exit (no queries maybe?)
  process.exit()
}

run()
