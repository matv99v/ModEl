// pm2 start ecosystem.config.js --only <<name of the app>>

module.exports = {
    apps : [
        {
            name: 'prod_ME',
            script: 'bin/www',
            env: {
                NODE_ENV: "production",
                PORT: 3000,
                DB_NAME: "goods"
            }
        },
        {
            name: 'develop_ME',
            script: 'bin/www',
            env: {
                NODE_ENV: "development",
                PORT: 3001,
                DB_NAME: "goodsdev"
            },
            watch: true
        }
    ]

};
