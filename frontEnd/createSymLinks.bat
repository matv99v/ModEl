:: todo: import json assetsPath


echo off
    title utilizewindows.com Batch file
    :: This line is a comment
    echo Creating symlinks to assets

    mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\html C:\WServ\data\htdocs\assets\html
    mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\Manuals C:\WServ\data\htdocs\assets\Manuals
    mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\goods-photos C:\WServ\data\htdocs\assets\goods-photos
    mklink C:\WServ\data\htdocs\ModEl-test\server\public\favicon.png C:\WServ\data\htdocs\assets\favicon.png

    echo Symlinks successfully craeted
