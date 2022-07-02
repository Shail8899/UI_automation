const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  env: {
    url: "https://www.rahulshettyacademy.com",
  },
  retries: {
    runMode: 1,
  },
  reporter: "mochawesome",
  projectId: "aj4xf7",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/integration/**/*.{js,jsx,ts,tsx}",
  },
});
