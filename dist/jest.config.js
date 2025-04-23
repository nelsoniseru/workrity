"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    testEnvironment: 'node',
    testMatch: ['**/test/*.test.ts'], // Match .test.ts files in src/test/
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Path to setup file
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.ts$': ['ts-jest', {
                useESM: true, // Enable ES Modules
                tsconfig: '<rootDir>/tsconfig.json', // Use project tsconfig
            }],
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    extensionsToTreatAsEsm: ['.ts'], // Treat .ts as ES Modules
    transformIgnorePatterns: ['/node_modules/(?!yamljs)/'], // Allow yamljs transformation
};
