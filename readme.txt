1. cd into ./fronEnd forlder and run one of the build sripts
    npm run dev|prod|staging

2. cd into ./server folder and start server with a command for appropriate env
    pm2 start ecosystem.config.js --only <<name of the app>>

3. ensure that server has started
    pm2 list

4. make a pm2 snapshot for resurrecting after machine restart
    pm2 save
