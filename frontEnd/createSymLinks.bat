echo off
title utilizewindows.com Batch file
echo Creating symlinks to assets

 del C:\WServ\data\htdocs\ModEl-test\server\public\favicon.png
 rmdir C:\WServ\data\htdocs\ModEl-test\server\public\goods-photos
 rmdir C:\WServ\data\htdocs\ModEl-test\server\public\html
 rmdir C:\WServ\data\htdocs\ModEl-test\server\public\Manuals

if not exist "C:\WServ\data\htdocs\ModEl-test\server\public" mkdir "C:\WServ\data\htdocs\ModEl-test\server\public"
 mklink C:\WServ\data\htdocs\ModEl-test\server\public\favicon.png C:\WServ\data\htdocs\assets\favicon.png
 mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\goods-photos C:\WServ\data\htdocs\assets\goods-photos
 mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\html C:\WServ\data\htdocs\assets\html
 mklink /D C:\WServ\data\htdocs\ModEl-test\server\public\Manuals C:\WServ\data\htdocs\assets\Manuals

echo Symlinks successfully craeted