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
    preset: '@shelf/jest-mongodb',
}