module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    'components/(.*)': '<rootDir>/components/$1',
    'pages/(.*)': '<rootDir>/pages/$1',
    'actions/(.*)': '<rootDir>/actions/$1',
    'hooks/(.*)': '<rootDir>/hooks/$1',
  }
}