// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // raíz del proyecto donde está next.config.js
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ajustar según alias
  },
};

module.exports = createJestConfig(customJestConfig);


