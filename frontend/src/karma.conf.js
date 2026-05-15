module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('jasmine-core'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        e
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAllMessages: true 
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../coverage/frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Désactivé pour Jenkins

    // --- LA CONFIGURATION CRUCIALE POUR JENKINS / AWS ---
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    },
    singleRun: true, // IMPORTANT : Jenkins s'arrête après le test
    restartOnFileChange: false
    // ----------------------------------------------------
  });
};