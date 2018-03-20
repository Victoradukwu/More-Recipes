module.exports = {
  rootDir: 'client/src',
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
    localStorage: {
      setItem: () => null,
      getItem: () => null,
      clearItem: () => null,
      removeItem: () => null,
    }
  }
};
