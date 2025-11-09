#!/bin/bash

# Deploy built Experience Builder app to Vercel
# This script should be run AFTER you've published your Experience through the UI

echo "🔍 Checking for built files..."

if [ ! -d "client/dist/apps/0" ]; then
    echo "❌ ERROR: No built files found!"
    echo ""
    echo "You need to build your Experience first:"
    echo "1. Run: cd server && npm start"
    echo "2. Open: http://localhost:3000"
    echo "3. Create/configure your experience with the chatbot widget"
    echo "4. Click 'Publish' button to build the app"
    echo "5. Then run this script again"
    echo ""
    exit 1
fi

echo "✅ Built files found!"
echo ""
echo "🚀 Deploying to Vercel..."
echo ""

# Navigate to built app directory
cd client/dist/apps/0

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Don't forget to:"
echo "1. Add OPENROUTER_API_KEY to Vercel environment variables"
echo "2. Test the chatbot functionality"
echo "3. Configure any data sources/layers"
echo ""
