# @pieh/gatsby-type-gen

## Usage:

Use following command in your Gatsby project

```
npx @pieh/gatsby-type-gen
```

> **Note:** This is currently proof of concept. There are no sanity checks,  so make sure you use this in Gatsby project directory - otherwise it will actually try to run Gatsby even if it shouldn't - it should crash saying `gatsby` module not found, but no guarantee. It also doesn't have any error handling so confusing errors are very real possibility.

## How it works:

- run part of gatsby bootstrap:
  - sourcing and transforming nodes
  - creating page objects (not actual html pages)
  - extract queries
  - create up to date graphql schema
  - stop there (it won't run queries)
- grab extracted queries (transformed by relay-compiler, so fragments are covered)
- use `apollo-codegen-core` and `apollo-codegen-typescript` to generate typescript definition for query results
- save typings to `./src/query-result-types`
- output somewhat friendly instructions how to import those typings:
  - for typescript projects
  - for js projects (if you use VS code - this might work with other editors/IDEs, but at least the way I know how to use this in vscode doesn't work in WebStorm)

## Known issues / limitations:

- Date fields are typed as `any`. That's because Gatsby create custom GraphQL scalar type for `Date` - which is really same as `string`, only description is added ( https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/src/schema/types/type-date.js ). I'm pretty sure we can add custom handling of that, it just isn't priority.

## Demo:

- VS Code + JsDoc annotations - https://www.youtube.com/watch?v=jrsEZp2JwIk&feature=youtu.be
- Using typescript: https://github.com/pieh/type-gen-expirement

## Example output:

- ### Console output:

  ```
  ➜  www git:(master) ✗ npx @pieh/gatsby-type-gen
  npx: installed 142 in 5.046s
  success open and validate gatsby-configs — 0.004 s
  success load plugins — 0.290 s
  success onPreInit — 1.020 s
  success delete html and css files from previous builds — 0.709 s
  success initialize cache — 0.011 s
  success copy gatsby files — 0.053 s
  success onPreBootstrap — 0.013 s
  success source and transform nodes — 3.849 s
  success building schema — 1.614 s
  success createPages — 1.285 s
  success createPagesStatefully — 0.037 s
  success onPreExtractQueries — 0.003 s
  success update schema — 1.181 s
  success extract queries from components — 0.395 s
  ⠂ run graphql queriesGenerating types
  ⡀ run graphql queries
  Done. Types are saved in /Users/misiek/dev/gatsby/www/src/query-result-types.

  Typescript instructions:

  In /Users/misiek/dev/gatsby/www/src/templates/template-blog-list.js:
  import { blogListQuery } from "../query-result-types/blogListQuery"

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-local-packages.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsLocalPackagesJs2742909928 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsLocalPackagesJs2742909928"

  In /Users/misiek/dev/gatsby/www/src/templates/template-contributor-page.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateContributorPageJs391458786 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateContributorPageJs391458786"

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-markdown.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsMarkdownJs652614998 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsMarkdownJs652614998"

  In /Users/misiek/dev/gatsby/www/src/templates/tags.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTagsJs3289879456 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTagsJs3289879456"

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-remote-packages.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsRemotePackagesJs803499274 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsRemotePackagesJs803499274"

  In /Users/misiek/dev/gatsby/www/src/pages/blog/tags.js:
  import { usersMisiekDevGatsbyWwwSrcPagesBlogTagsJs2738989372 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesBlogTagsJs2738989372"

  In /Users/misiek/dev/gatsby/www/src/pages/creators/agencies.js:
  import { usersMisiekDevGatsbyWwwSrcPagesCreatorsAgenciesJs1511946271 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsAgenciesJs1511946271"

  In /Users/misiek/dev/gatsby/www/src/pages/creators/index.js:
  import { usersMisiekDevGatsbyWwwSrcPagesCreatorsIndexJs774676196 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsIndexJs774676196"

  In /Users/misiek/dev/gatsby/www/src/templates/template-starter-page.js:
  import { TemplateStarter } from "../query-result-types/TemplateStarter"

  In /Users/misiek/dev/gatsby/www/src/pages/creators/people.js:
  import { usersMisiekDevGatsbyWwwSrcPagesCreatorsPeopleJs3796174971 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsPeopleJs3796174971"

  In /Users/misiek/dev/gatsby/www/src/pages/docs/actions.js:
  import { usersMisiekDevGatsbyWwwSrcPagesDocsActionsJs807554310 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsActionsJs807554310"

  In /Users/misiek/dev/gatsby/www/src/pages/docs/browser-apis.js:
  import { usersMisiekDevGatsbyWwwSrcPagesDocsBrowserApisJs3470624177 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsBrowserApisJs3470624177"

  In /Users/misiek/dev/gatsby/www/src/pages/docs/node-apis.js:
  import { usersMisiekDevGatsbyWwwSrcPagesDocsNodeApisJs352840185 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsNodeApisJs352840185"

  In /Users/misiek/dev/gatsby/www/src/pages/creators/companies.js:
  import { usersMisiekDevGatsbyWwwSrcPagesCreatorsCompaniesJs2498576037 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsCompaniesJs2498576037"

  In /Users/misiek/dev/gatsby/www/src/pages/index.js:
  import { IndexRouteQuery } from "../query-result-types/IndexRouteQuery"

  In /Users/misiek/dev/gatsby/www/src/templates/template-creator-details.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateCreatorDetailsJs3298700886 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateCreatorDetailsJs3298700886"

  In /Users/misiek/dev/gatsby/www/src/pages/features.js:
  import { usersMisiekDevGatsbyWwwSrcPagesFeaturesJs3374125190 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcPagesFeaturesJs3374125190"

  In /Users/misiek/dev/gatsby/www/src/pages/ecosystem.js:
  import { EcosystemQuery } from "../query-result-types/EcosystemQuery"

  In /Users/misiek/dev/gatsby/www/src/pages/showcase.js:
  import { usersMisiekDevGatsbyWwwSrcPagesShowcaseJs3395779605 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcPagesShowcaseJs3395779605"

  In /Users/misiek/dev/gatsby/www/src/templates/template-blog-post.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateBlogPostJs1890378699 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateBlogPostJs1890378699"

  In /Users/misiek/dev/gatsby/www/src/pages/starters.js:
  import { SiteShowcaseQuery } from "../query-result-types/SiteShowcaseQuery"

  In /Users/misiek/dev/gatsby/www/src/templates/template-showcase-details.js:
  import { usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900 } from "../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900"

  In /Users/misiek/dev/gatsby/www/src/pages/docs/ssr-apis.js:
  import { usersMisiekDevGatsbyWwwSrcPagesDocsSsrApisJs2511557810 } from "../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsSsrApisJs2511557810"

  VsCode + JsDoc instructions:

  Add // @ts-check at the top of your file and annotate "data" prop with:

  In /Users/misiek/dev/gatsby/www/src/templates/template-blog-list.js:
  /** @type { import("../query-result-types/blogListQuery").blogListQuery } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-local-packages.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsLocalPackagesJs2742909928").usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsLocalPackagesJs2742909928 } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-contributor-page.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateContributorPageJs391458786").usersMisiekDevGatsbyWwwSrcTemplatesTemplateContributorPageJs391458786 } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-markdown.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsMarkdownJs652614998").usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsMarkdownJs652614998 } */

  In /Users/misiek/dev/gatsby/www/src/templates/tags.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTagsJs3289879456").usersMisiekDevGatsbyWwwSrcTemplatesTagsJs3289879456 } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-docs-remote-packages.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsRemotePackagesJs803499274").usersMisiekDevGatsbyWwwSrcTemplatesTemplateDocsRemotePackagesJs803499274 } */

  In /Users/misiek/dev/gatsby/www/src/pages/blog/tags.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesBlogTagsJs2738989372").usersMisiekDevGatsbyWwwSrcPagesBlogTagsJs2738989372 } */

  In /Users/misiek/dev/gatsby/www/src/pages/creators/agencies.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsAgenciesJs1511946271").usersMisiekDevGatsbyWwwSrcPagesCreatorsAgenciesJs1511946271 } */

  In /Users/misiek/dev/gatsby/www/src/pages/creators/index.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsIndexJs774676196").usersMisiekDevGatsbyWwwSrcPagesCreatorsIndexJs774676196 } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-starter-page.js:
  /** @type { import("../query-result-types/TemplateStarter").TemplateStarter } */

  In /Users/misiek/dev/gatsby/www/src/pages/creators/people.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsPeopleJs3796174971").usersMisiekDevGatsbyWwwSrcPagesCreatorsPeopleJs3796174971 } */

  In /Users/misiek/dev/gatsby/www/src/pages/docs/actions.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsActionsJs807554310").usersMisiekDevGatsbyWwwSrcPagesDocsActionsJs807554310 } */

  In /Users/misiek/dev/gatsby/www/src/pages/docs/browser-apis.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsBrowserApisJs3470624177").usersMisiekDevGatsbyWwwSrcPagesDocsBrowserApisJs3470624177 } */

  In /Users/misiek/dev/gatsby/www/src/pages/docs/node-apis.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsNodeApisJs352840185").usersMisiekDevGatsbyWwwSrcPagesDocsNodeApisJs352840185 } */

  In /Users/misiek/dev/gatsby/www/src/pages/creators/companies.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesCreatorsCompaniesJs2498576037").usersMisiekDevGatsbyWwwSrcPagesCreatorsCompaniesJs2498576037 } */

  In /Users/misiek/dev/gatsby/www/src/pages/index.js:
  /** @type { import("../query-result-types/IndexRouteQuery").IndexRouteQuery } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-creator-details.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateCreatorDetailsJs3298700886").usersMisiekDevGatsbyWwwSrcTemplatesTemplateCreatorDetailsJs3298700886 } */

  In /Users/misiek/dev/gatsby/www/src/pages/features.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcPagesFeaturesJs3374125190").usersMisiekDevGatsbyWwwSrcPagesFeaturesJs3374125190 } */

  In /Users/misiek/dev/gatsby/www/src/pages/ecosystem.js:
  /** @type { import("../query-result-types/EcosystemQuery").EcosystemQuery } */

  In /Users/misiek/dev/gatsby/www/src/pages/showcase.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcPagesShowcaseJs3395779605").usersMisiekDevGatsbyWwwSrcPagesShowcaseJs3395779605 } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-blog-post.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateBlogPostJs1890378699").usersMisiekDevGatsbyWwwSrcTemplatesTemplateBlogPostJs1890378699 } */

  In /Users/misiek/dev/gatsby/www/src/pages/starters.js:
  /** @type { import("../query-result-types/SiteShowcaseQuery").SiteShowcaseQuery } */

  In /Users/misiek/dev/gatsby/www/src/templates/template-showcase-details.js:
  /** @type { import("../query-result-types/usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900").usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900 } */

  In /Users/misiek/dev/gatsby/www/src/pages/docs/ssr-apis.js:
  /** @type { import("../../query-result-types/usersMisiekDevGatsbyWwwSrcPagesDocsSsrApisJs2511557810").usersMisiekDevGatsbyWwwSrcPagesDocsSsrApisJs2511557810 } */
  ```

- ### Type definition files:

  ```typescript
  /* tslint:disable */
  /* eslint-disable */
  // This file was automatically generated and should not be edited.

  // ====================================================
  // GraphQL query operation: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900
  // ====================================================

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp_fluid {
    aspectRatio: number | null
    src: string | null
    srcSet: string | null
    sizes: string | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp_resize {
    src: string | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp {
    fluid: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp_fluid | null
    resize: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp_resize | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile {
    /**
     * The child of this node of type imageSharp
     */
    childImageSharp: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile_childImageSharp | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot {
    screenshotFile: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot_screenshotFile | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_fields {
    slug: string | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml {
    /**
     * The id of this node.
     */
    id: string
    title: string | null
    main_url: string | null
    featured: boolean | null
    categories: (string | null)[] | null
    built_by: string | null
    built_by_url: string | null
    source_url: string | null
    description: string | null
    /**
     * The child of this node of type screenshot
     */
    childScreenshot: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_childScreenshot | null
    fields: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml_fields | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900 {
    sitesYaml: usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900_sitesYaml | null
  }

  export interface usersMisiekDevGatsbyWwwSrcTemplatesTemplateShowcaseDetailsJs981880900Variables {
    slug: string
  }
  ```

  This is generated from https://github.com/gatsbyjs/gatsby/blob/a420eb40451fcf7652432b53387dab0a27b64472/www/src/templates/template-showcase-details.js#L96-L130
