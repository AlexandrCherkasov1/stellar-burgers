export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '^@api(.*)$': '<rootDir>/src/utils/burger-api$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    'node_modules/nanoid/.*': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(nanoid)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
