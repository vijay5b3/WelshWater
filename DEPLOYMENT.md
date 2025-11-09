# Deployment Guide

## Prerequisites

- Git installed
- Node.js 16+ installed
- Vercel account (or other hosting platform)
- OpenRouter API key

## Step 1: Prepare for Git

1. **Initialize Git repository** (if not already done)
   ```bash
   cd arcgis-experience-builder-1.18
   git init
   ```

2. **Check .gitignore**
   ```bash
   # Verify .gitignore exists and contains:
   # - node_modules/
   # - .env
   # - dist/
   # - *.log
   ```

3. **Create .env file** (don't commit this!)
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

## Step 2: Commit to Git

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Welsh Government Data Chatbot"

# Create GitHub repository (via GitHub website)
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
6. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: your-project-name
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

## Step 4: Configure Widget Settings

After deployment:

1. Open your deployed Experience Builder app
2. Add the Chatbot widget
3. Click settings (⚙️)
4. Enter your OpenRouter API Key
5. Select model: `mistralai/mistral-7b-instruct`
6. Save

## Step 5: Test Deployment

Test these queries on your deployed app:

```
help
schools in Cardiff
schools with postcode CF10
zoom to Cardiff
print
```

## Alternative Deployment Options

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --dir=client/dist --prod
```

### Deploy to AWS S3

```bash
# Build
cd client && npm run build

# Upload to S3
aws s3 sync client/dist/ s3://your-bucket-name/ --acl public-read
```

### Deploy to Custom Server

```bash
# Build client
cd client
npm run build

# Copy files to server
scp -r client/dist/* user@server:/var/www/html/
scp -r server/* user@server:/opt/app/

# On server:
cd /opt/app
npm install
node src/server.js
```

## Environment Variables

### Required for Deployment

- `NODE_ENV` = `production`

### Optional

- `OPENROUTER_API_KEY` (if using server-side API calls)
- `ARCGIS_API_KEY` (if using ArcGIS premium features)

### Setting Environment Variables in Vercel

1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables
4. Redeploy

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
cd client
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Widget Not Loading

1. Check browser console for errors
2. Verify widget manifest.json
3. Check ArcGIS JS API version compatibility
4. Verify HTTPS is enabled (required for geocoding)

### API Key Issues

1. Verify OpenRouter API key is valid
2. Check key has credits/balance
3. Ensure key is entered correctly in widget settings
4. Check browser console for API errors

## Performance Optimization

### 1. Enable Caching

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### 2. Optimize Build

```bash
# Use production build
npm run build

# Analyze bundle size
npm run analyze
```

### 3. CDN Configuration

- Enable Vercel Edge Network
- Use closest region to users
- Enable compression

## Monitoring

### Vercel Analytics

1. Go to Project Dashboard
2. Enable Analytics
3. Monitor:
   - Page views
   - Load times
   - Errors

### Custom Monitoring

Add to widget:

```typescript
// Log errors to external service
window.addEventListener('error', (event) => {
  // Send to monitoring service
  console.error('Widget error:', event.error)
})
```

## Updates and Maintenance

### Update Widget

```bash
# Make changes
git add .
git commit -m "Update: description"
git push

# Vercel auto-deploys from main branch
```

### Rollback

```bash
# In Vercel dashboard
# Go to Deployments
# Click on previous deployment
# Click "Promote to Production"
```

## Security Checklist

- ✅ .gitignore includes .env
- ✅ API keys not in code
- ✅ HTTPS enabled
- ✅ CORS configured correctly
- ✅ Dependencies updated
- ✅ No sensitive data in logs

## Post-Deployment Testing

Run these tests after deployment:

1. ✅ Widget loads correctly
2. ✅ AI queries work
3. ✅ Navigation works
4. ✅ Print functionality works
5. ✅ Layer controls work
6. ✅ Help command shows all features
7. ✅ Welsh language queries work
8. ✅ Mobile responsive

---

**Deployment Complete! 🚀**

Your Welsh Government Data Chatbot is now live!
