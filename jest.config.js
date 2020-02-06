module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '\\.(ts|tsx)?$': 'babel-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],   // looks for your test
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/public/'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
    ]
};