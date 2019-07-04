module.exports = {
  coverageDirectory: '.coverage',
  collectCoverageFrom: ['src/**/*.{js}', '!src/**/index.js'],
  setupFiles: [],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.js', '<rootDir>/src/**/?(*.)(spec|test).js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js', 'json', 'node', 'mjs'],
};
