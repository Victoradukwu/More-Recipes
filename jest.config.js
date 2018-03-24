module.exports = {
  rootDir: 'client/src',
  setupFiles: [
    'jest-localstorage-mock',
    '<rootDir>/test/setupTests'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/test', '<rootDir>/coverage', '<rootDir>/index.jsx'],
  globals: {
    toastr: {
      info: () => null,
      success: () => null,
      error: () => null,
      warning: () => null
    },
    filereader = {
  readAsDataURL: jest.fn(file => file),
  onload: jest.fn()
}
  },
};
