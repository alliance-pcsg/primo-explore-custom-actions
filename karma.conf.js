module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-material/angular-material.js',
      'node_modules/angular-messages/angular-messages.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-material/angular-material-mocks.js',
      'dist/module.js',
      'test/**/*.spec.js',
    ],
  })
}
