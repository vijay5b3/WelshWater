@echo off
REM Deploy built Experience Builder app to Vercel (Windows)
REM This script should be run AFTER you've published your Experience through the UI

echo Checking for built files...
echo.

if not exist "client\dist\apps\0" (
    echo ERROR: No built files found!
    echo.
    echo You need to build your Experience first:
    echo 1. Run: cd server
    echo 2. Run: npm start
    echo 3. Open: http://localhost:3000
    echo 4. Create/configure your experience with the chatbot widget
    echo 5. Click 'Publish' button to build the app
    echo 6. Then run this script again
    echo.
    exit /b 1
)

echo Built files found!
echo.
echo Deploying to Vercel...
echo.

REM Navigate to built app directory
cd client\dist\apps\0

REM Check if vercel is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

REM Deploy to production
echo Deploying to production...
call vercel --prod

echo.
echo Deployment complete!
echo.
echo Don't forget to:
echo 1. Add OPENROUTER_API_KEY to Vercel environment variables
echo 2. Test the chatbot functionality
echo 3. Configure any data sources/layers
echo.

pause
