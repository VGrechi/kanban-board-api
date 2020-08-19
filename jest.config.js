module.exports = {
    transform: {
        "^.+\\.ts": "ts-jest"
    },
    testRegex: "\\.test\\.ts",
    moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
    ],
    testEnvironment: "node",
    //preset: '@shelf/jest-mongodb',
}