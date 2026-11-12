@echo off
:: Batch file to map www.a2z.com to 127.0.0.1 in Windows hosts file
echo ======================================================
echo Mapping www.a2z.com and a2z.com to 127.0.0.1 ...
echo ======================================================

net session >nul 2>&1
if %errorLevel% == 0 (
    echo Administrative permissions confirmed.
    findstr /i "www.a2z.com" %SystemRoot%\System32\drivers\etc\hosts >nul
    if %errorLevel% == 0 (
        echo [OK] www.a2z.com is already mapped in your hosts file.
    ) else (
        echo 127.0.0.1 www.a2z.com >> %SystemRoot%\System32\drivers\etc\hosts
        echo 127.0.0.1 a2z.com >> %SystemRoot%\System32\drivers\etc\hosts
        echo [SUCCESS] www.a2z.com and a2z.com successfully mapped to 127.0.0.1!
    )
) else (
    echo Requesting Administrator privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~f0\"' -Verb RunAs"
    exit /b
)

echo.
echo ======================================================
echo You can now open your browser and navigate to:
echo http://www.a2z.com
echo ======================================================
pause
