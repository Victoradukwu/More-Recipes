module.exports = {
  rootDir: 'client/src',
  setupFiles: ['jest-localstorage-mock'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/test', '<rootDir>/coverage'],
  globals: {
    toastr: {
      info: () => null,
      success: () => null,
      error: () => null,
      warning: () => null
    },
  }
};
