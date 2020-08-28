module.exports = {
  moduleNameMapper: {
    '^/@services/(.*)$': '<rootDir>/src/services/$1',
    '^/@components/(.*)$': '<rootDir>/src/components/$1',
  },
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: [],
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['__testUtils__'],
  clearMocks: true,
  restoreMocks: true,
  testMatch: ['**/*.test.(js|ts)'],
  roots: ['<rootDir>/src'],
}
