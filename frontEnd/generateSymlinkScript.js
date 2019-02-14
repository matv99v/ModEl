// generates symlinks from assets folder to a public folder

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const config = require('./config.json');

const assetsPath = path.resolve(config.assetsPath);
const outputPath = path.resolve(config.publicPath);
const isWin = process.platform === 'win32';


function symlinkForFile(fileName) {
    return isWin
        ? `mklink ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`
        : `ln -s ${assetsPath}${path.sep}${fileName} ${outputPath}${path.sep}${fileName}`;
}
function symlinkForDirectory(fileName) {
    return isWin
        ? `mklink /D ${outputPath}${path.sep}${fileName} ${assetsPath}${path.sep}${fileName}`
        : `ln -s ${assetsPath}${path.sep}${fileName} ${outputPath}${path.sep}${fileName}`;
}
function removeFile(file) {
    return isWin
        ? `del ${outputPath}${path.sep}${file}`
        : `rm -f ${outputPath}${path.sep}${file}`;
}
function removeDir(dir) {
    return isWin
        ? `rmdir ${outputPath}${path.sep}${dir}`
        : `rm -rf ${outputPath}${path.sep}${dir}`;
}

function reduceAction(arr, fn) {
    return arr.reduce((acc, file) => {
        return `${acc} ${fn(file)}\n`;
    }, '');
}

function createOutputFolderIfNotExist(folder) {
    return isWin
        ? `if not exist "${folder}" mkdir "${folder}"`
        : `mkdir -p ${folder}`;
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
        : `#!/bin/bash
${reduceAction(files, removeFile)}${reduceAction(directories, removeDir)}
${createOutputFolderIfNotExist(outputPath)}
${reduceAction(files, symlinkForFile)}${reduceAction(directories, symlinkForDirectory)}
RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo Symlinks successfully craeted
else
  echo Symlinks creation failed
fi`;
}


// // delete previously generated script
// if (fs.existsSync('./createSymlinks.bat')) {
//     fs.unlinkSync('./createSymlinks.bat');
// }
// if (fs.existsSync('./createSymlinks.sh')) {
//     fs.unlinkSync('./createSymlinks.sh');
// }

// // generate a new one
// fs.writeFileSync(`./createSymlinks.${isWin ? 'bat' : 'sh'}`, generateScript(), 'utf8');

child_process.exec(generateScript(), (err, stdout, stderr) => {
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
});
