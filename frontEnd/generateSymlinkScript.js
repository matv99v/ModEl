const fs = require('fs');
const path = require("path");
const config = require('./config.json');

const assetsPath = path.resolve(config.assetsPath);
const outputPath = path.resolve(config.publicPath);
const isWin = process.platform === 'win32';


function symlinkForFile(fileName) {
    return isWin
        ? `mklink ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`
        : `ln -s ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`
}
function symlinkForDirectory(fileName) {
    return isWin
        ? `mklink /D ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`
        : `ln -s ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`;
}
function removeFile(file) {
    return isWin
    ? `del ${outputPath}${path.sep}${file}`
    : `rm ${outputPath}${path.sep}${file}`;
}
function removeDir(dir) {
    return isWin
        ? `rmdir ${outputPath}${path.sep}${dir}`
        : `rm -rf ${outputPath}${path.sep}${dir}`;
}

function reduceAction(arr, fn) {
    return arr.reduce((acc, file, i) => {
        return `${acc} ${fn(file)}\n`;
    }, '');
}

function createOutputFolderIfNotExist(folder) {
    return isWin
        ? `if not exist "${folder}" mkdir "${folder}"`
        : `if (!fs.existsSync("${folder}")) fs.mkdirSync("${folder}");`;
}

const assets = fs.readdirSync(config.assetsPath);

const files = assets.filter(file => {
    const pathStr = `${config.assetsPath}/${file}`;
    return fs.lstatSync(pathStr).isFile();
});

const directories = assets.filter(file => {
    const pathStr = `${config.assetsPath}/${file}`;
    return fs.lstatSync(pathStr).isDirectory();
});

function generateScript() {
    return isWin
    ? `echo off
title utilizewindows.com Batch file
echo Creating symlinks to assets

${reduceAction(files, removeFile)}${reduceAction(directories, removeDir)}
${createOutputFolderIfNotExist(outputPath)}
${reduceAction(files, symlinkForFile)}${reduceAction(directories, symlinkForDirectory)}
echo Symlinks successfully craeted`
    : `${reduceAction(files, removeFile)}${reduceAction(directories, removeDir)}
${createOutputFolderIfNotExist(outputPath)}
${reduceAction(files, symlinkForFile)}${reduceAction(directories, symlinkForDirectory)}
console.log('Symlinks successfully craeted');`;
}


// delete previously generated script
if (fs.existsSync('./createSymlinks.js')) {
    fs.unlinkSync('./createSymlinks.js');
}
if (fs.existsSync('./createSymlinks.bat')) {
    fs.unlinkSync('./createSymlinks.bat');
}

// generate a new one
fs.writeFileSync(`./createSymlinks.${isWin ? 'bat' : 'js'}`, generateScript(), 'utf8');
