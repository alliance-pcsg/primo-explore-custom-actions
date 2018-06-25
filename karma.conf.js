module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'dist/module.js',
      'test/**/*.spec.js',
    ],
    preprocessors: {
      'test/**/*.spec.js': [
        'babel',
        'sourcemap',
      ],
    },
  })
}
