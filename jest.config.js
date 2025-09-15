// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // raíz del proyecto donde está next.config.js
});

const customJestConfig = {
 setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // ajustar según tus alias
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

module.exports = createJestConfig(customJestConfig);
