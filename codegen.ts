import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://wpe-hiring.tokopedia.net/graphql",
  documents: "src/gql/graphql.ts/",
  generates: {
    "src/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
