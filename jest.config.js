module.exports = {
    moduleNameMapper: {
        "^../../components/(.*)$": "<rootDir>/src/components/$1"
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    }
};