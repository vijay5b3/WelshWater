# 🚨 Vercel 404 Error - Fix Guide

## Why You Got 404 Error

ArcGIS Experience Builder **CANNOT be directly deployed to Vercel** because:
- ❌ It's a development framework, not a deployable app
- ❌ You need to **publish/build** the app first through the Experience Builder UI
- ❌ Vercel expects static files in `client/dist/apps/0/` which don't exist yet

---

## ✅ SOLUTION: Correct Deployment Process

### Step 1: Run Experience Builder Locally

```bash
# Start the development server
cd server
npm start

# Open browser to http://localhost:3000
```

### Step 2: Create and Configure Your Experience

1. **Open Experience Builder**: http://localhost:3000
2. **Create new experience** or open existing one
3. **Add the Chatbot widget** to your experience
4. **Configure the widget settings**:
   - OpenRouter API Key: `sk-or-v1-8fa4b609...`
   - AI Model: `mistralai/mistral-7b-instruct`
   - Temperature: `0.3`

### Step 3: Publish Your Experience

1. Click **"Publish"** button in top-right corner
2. This creates static files in: `client/dist/apps/0/`
3. These are the files you deploy to Vercel

### Step 4: Deploy to Vercel

**Option A: Deploy via Vercel CLI**
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Navigate to the published app directory
cd client/dist/apps/0

# Deploy to Vercel
vercel --prod
```

**Option B: Deploy via Vercel Dashboard**
1. Go to https://vercel.com/new
2. **Don't import from GitHub** (GitHub has source code, not built app)
3. Instead, upload the `client/dist/apps/0/` folder manually
4. Or create a separate GitHub repo with just the built files

---

## 🎯 RECOMMENDED: Use ArcGIS Online Instead

**Best solution for production:**

### Why ArcGIS Online?
- ✅ **Free hosting** (included with ArcGIS account)
- ✅ **Built-in CDN** (fast worldwide)
- ✅ **Automatic HTTPS**
- ✅ **Integrated security**
- ✅ **No build/deploy needed**

### How to Deploy to ArcGIS Online:

1. **Sign in to ArcGIS Online**: https://www.arcgis.com/
2. **Open Experience Builder**: Apps → Experience Builder
3. **Create or import your experience**
4. **Add your widget**:
   - Upload `client/your-extensions/widgets/chatbot/` to your ArcGIS organization
5. **Publish**:
   - Click "Publish" button
   - Get URL: `https://yourdomain.maps.arcgis.com/apps/experiencebuilder/experience/?id=xxx`
6. **Share**: Make public or share with specific groups

---

## 🔧 Alternative: Deploy to Other Platforms

If you need custom hosting:

### Railway.app (Recommended for Node.js apps)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OPENROUTER_API_KEY=sk-or-v1-8fa4b609...

# Deploy
railway up
```

### Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create welsh-water-chatbot

# Set config
heroku config:set OPENROUTER_API_KEY=sk-or-v1-8fa4b609...

# Deploy
git push heroku main

# Open
heroku open
```

---

## 📋 Current Vercel Project - What to Do

### Option 1: Delete and Redeploy Correctly

```bash
# Delete current Vercel deployment
vercel remove welsh-water

# Build your Experience first (via UI)
# Then deploy the built files

# Navigate to built app
cd client/dist/apps/0

# Deploy
vercel --prod
```

### Option 2: Keep GitHub, Use Different Hosting

- Keep code on GitHub: https://github.com/vijay5b3/WelshWater
- Deploy to ArcGIS Online or Railway instead of Vercel
- Use GitHub for version control only

---

## 🚀 Quick Start (Easiest Path)

### For Testing:
```bash
# 1. Start local server
cd server
npm start

# 2. Open http://localhost:3000
# 3. Test the chatbot widget
```

### For Production:
**Option A: ArcGIS Online** (Recommended)
1. Sign in to ArcGIS Online
2. Create Experience in cloud version
3. Add widget files via organization uploads
4. Publish and share

**Option B: Export Static Build**
1. Run local Experience Builder
2. Create and configure your app
3. Click "Publish" → Downloads ZIP
4. Extract and deploy to any static host (Netlify, GitHub Pages, etc.)

---

## 💡 Key Takeaway

**Experience Builder is a DEVELOPMENT tool.**  
You must **build/publish** your app first, then deploy the **output** (`client/dist/`), not the source code.

Think of it like:
- **Source Code** (what's on GitHub) = The factory
- **Built App** (client/dist/) = The product
- **Vercel** = The store (needs products, not factories)

---

## Need Help?

Choose one path:
1. **I want to test locally** → Run `npm start` in server folder
2. **I want production hosting** → Use ArcGIS Online
3. **I want custom hosting** → Build first, then deploy static files

What would you like to do?
