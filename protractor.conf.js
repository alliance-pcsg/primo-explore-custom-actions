exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/*.spec.js'],
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    displayStacktrace: true,
    displaySpecDuration: true,
  },
  onPrepare: () => {
    browser.manage().window().maximize()
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'spec',
    }))
  },
  multiCapabilities: [{
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--disable-infobars',
        '--disable-extensions',
        'verbose',
      ],
      prefs: {
        'profile.password_manager_enabled': false,
        'credentials_enable_service': false,
        'password_manager_enabled': false,
      },
    },
  }],
}
