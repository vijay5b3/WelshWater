# Vercel Deployment Fix

## Problem
ArcGIS Experience Builder cannot be directly deployed to Vercel because it needs to be built and published first.

## Solution: Deploy Built App

### Step 1: Build Your Experience in ArcGIS Online
1. Open your Experience Builder app at: http://localhost:3000
2. Complete your app design with the chatbot widget
3. Click **Publish** in the top-right corner
4. Choose "Download" option
5. This creates a `dist/` folder with static files

### Step 2: Deploy Static Build to Vercel

Once you have the built files:

```bash
# Navigate to your downloaded app folder
cd path/to/downloaded-app

# Deploy to Vercel
vercel --prod
```

### Step 3: Update vercel.json for Static App

Replace the current `vercel.json` with:

```json
{
  "version": 2,
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

---

## Alternative: Use ArcGIS Online Hosting (EASIEST)

Since you're building for Welsh Government data, the **best approach** is:

### 1. **Publish to ArcGIS Online**
   - Build your Experience in Experience Builder Developer Edition
   - Publish directly to ArcGIS Online
   - Get a public URL like: `https://yourdomain.maps.arcgis.com/apps/experiencebuilder/experience/?id=xxx`

### 2. **Configure the Widget**
   - Add the OpenRouter API key in the Experience Builder settings
   - Widget settings are saved with the published app
   - No need for external hosting

---

## Alternative: Deploy Development Server (NOT RECOMMENDED)

If you really want to deploy the development environment to a server:

### Use a Node.js hosting platform instead:
- **Heroku** (free tier available)
- **Railway.app** (better for Node.js)
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**

### Deployment steps:
1. Create a `Procfile`:
   ```
   web: cd server && npm start
   ```

2. Add build scripts to root `package.json`:
   ```json
   {
     "scripts": {
       "install": "cd client && npm install && cd ../server && npm install",
       "start": "cd server && npm start"
     }
   }
   ```

3. Deploy to Railway:
   ```bash
   railway login
   railway init
   railway up
   ```

---

## Recommended Workflow

**For Production Welsh Government Chatbot:**

1. **Development** → Use local Experience Builder (http://localhost:3000)
2. **Build** → Publish your experience to ArcGIS Online
3. **Configure** → Add OpenRouter API key in widget settings
4. **Share** → Use ArcGIS Online URL or embed in your website

**Benefits:**
- ✅ No hosting costs (ArcGIS Online includes hosting)
- ✅ Automatic SSL/HTTPS
- ✅ CDN distribution for fast loading
- ✅ Integrated with ArcGIS security
- ✅ No server maintenance

---

## Quick Fix for Vercel Error

The 404 error you're seeing is because:
1. The `client/dist` folder doesn't exist (needs to be built)
2. Vercel can't run the development server
3. Experience Builder requires the full build process

**Next Steps:**
1. ❌ Delete the current Vercel deployment
2. ✅ Publish your Experience through Experience Builder UI
3. ✅ Deploy the published static files to Vercel
4. ✅ OR use ArcGIS Online hosting directly

Need help with any of these approaches?
