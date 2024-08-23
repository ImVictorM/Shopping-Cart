//jshint strict: false
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    "*.js"
  ],
  capabilities: {
    browserName: "chrome"
  },
  baseUrl: "http://localhost:7777/",
  framework: "jasmine",
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
