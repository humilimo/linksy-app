import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import pkg from "@badeball/cypress-cucumber-preprocessor";
const { addCucumberPreprocessorPlugin } = pkg;
import * as esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    viewportWidth: 1000,
    viewportHeight: 900,
    baseUrl: "http://192.168.0.83:3000",
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [esbuildPlugin.createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
