module.exports = {
  coverageReporters: ["lcov", "text-summary"],
  roots: [
    "<rootDir>/packages/accounts-client/src",
    "<rootDir>/packages/admin-client/src",
    "<rootDir>/packages/canary-client/src",
    "<rootDir>/packages/redes-client/src",
    "<rootDir>/packages/webpage-client/src",
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$":
      "<rootDir>/packages/admin-client/src/jest/mock-style.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": `<rootDir>/packages/admin-client/src/jest/mock-style.js`,

    // // Handle module aliases
    // "^components/(.*)$": "<rootDir>/packages/admin-client/src/components/$1",
    // "^mobrender/(.*)$": "<rootDir>/packages/admin-client/src/mobrender/$1",
    // "^mobilizations/(.*)$":
    //   "<rootDir>/packages/admin-client/src/mobilizations/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/packages/webpage/node_modules/",
    "<rootDir>/packages/webpage/.next/",
    "<rootDir>/packages/webpage/cypress-tests/",
  ],
  setupFilesAfterEnv: ["<rootDir>/packages/webpage-client/src/setupTests.ts"],
};
