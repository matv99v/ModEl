// pm2 start ecosystem.config.js --only <<name of the app>>

module.exports = {
    apps: [
        {
            name: 'prod_ME',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                DB_NAME: 'goods',
            },
            script: 'bin/www',
        },
        {
            name: 'staging_ME',
            env: {
                NODE_ENV: 'development',
                PORT: 3001,
                DB_NAME: 'goodsdev',
            },
            script: 'bin/www',
        },
        {
            name: 'develop_ME',
            env: {
                NODE_ENV: 'development',
                PORT: 3001,
                DB_NAME: 'goodsdev',
            },
            script: 'bin/www',
            ignoreWatch: ['node_modules', 'public'],
            watch: '../',
            args: ['--color'],
        },
    ],

};
