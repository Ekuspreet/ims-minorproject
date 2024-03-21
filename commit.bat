@echo off
git add .
git commit -m "%*"
git pull
git push