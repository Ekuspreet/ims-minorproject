@echo off
code -n -r client\ims-client
timeout /t 5 >nul
code -r server
timeout /t 5 >nul
start cmd /k "cd /d client\ims-client && npm run dev"
start cmd /k "cd /d server && call venv\Scripts\activate.bat && flask run --debug"
