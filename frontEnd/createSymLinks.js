const config = require('./config.json');
const makeSymlinks = require('make-symlinks');

const sources = [`${config.assetsPath}/*`];
const outputpath = '../server/public/';



makeSymlinks(sources, outputpath)
    .then(symlinks => {
        console.log(`${symlinks.length} symlink(s) created`);
    })
    .catch(err => {
        console.error('Symlinks error creation.', err);
    });
