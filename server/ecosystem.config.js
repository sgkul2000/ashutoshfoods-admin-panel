module.exports = {
    apps: [{
        name: "ashutoshfoods-admin-panel",
        script: "./index.js",
        instances: "max",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}