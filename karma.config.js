module.exports = function (config) {
  config.set({
    basePath: "./src/app",
    files: [
      "lib/angular/angular.js",
      "lib/angular-route/angular-route.js",
      "../../node_modules/angular-mocks/angular-mocks.js",
      "core/**/*.js",
      "features/**/*.js",
      "shared/**/*.js"
    ],
    autoWatch: true,
    frameworks: ["jasmine"],
    browsers: ["Chrome"],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};