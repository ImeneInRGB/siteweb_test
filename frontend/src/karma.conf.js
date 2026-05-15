browsers: ['ChromeHeadless'],
customLaunchers: {
  ChromeHeadlessCI: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}