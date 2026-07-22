@echo off
setlocal
cd /d "%~dp0"
set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%CODEX_NODE%" (
  echo Node.js runtime was not found.
  echo Please run: pnpm dev -- --host 127.0.0.1
  pause
  exit /b 1
)

echo Starting portfolio preview at http://127.0.0.1:5173/
echo Keep this window open while previewing the website.
"%CODEX_NODE%" "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1
pause
