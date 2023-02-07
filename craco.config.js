const path = require("path");

module.exports = {
    webpack: {
        alias: {
            Components: path.resolve(__dirname, "src", "components"),
            Store: path.resolve(__dirname, "src", "store"),
            Types: path.resolve(__dirname, "src", "types"),
            Routes: path.resolve(__dirname, "src", "routes")
        },
     },
     devServer: {
        allowedHosts: 'all'
    },
}

