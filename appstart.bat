@echo off
start cmd /k "cd /d client\ims-client && npm run dev"
start cmd /k "cd /d server && call venv\Scripts\activate.bat && flask run --debug"
