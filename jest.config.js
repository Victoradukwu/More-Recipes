module.exports = {
  rootDir: 'client/src',
  setupFiles: [
    'jest-localstorage-mock',
    '<rootDir>/test/setupTests'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/test', '<rootDir>/coverage',
    '<rootDir>/index.jsx', '<rootDir>/e2e_tests/e2e.test.js'],
  globals: {
    toastr: {
      info: () => null,
      success: () => null,
      error: () => null,
      warning: () => null
    }
  },
};
