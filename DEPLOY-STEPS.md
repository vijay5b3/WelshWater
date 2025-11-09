# 🚀 Step-by-Step: Git & Vercel Deployment

Follow these exact steps to deploy your Welsh Government Data Chatbot.

## Part 1: Prepare Your Code (5 minutes)

### Step 1: Verify Your Project

```bash
# Navigate to your project
cd "c:\Users\Vijay Kumar Bobbadi\Downloads\arcgis-experience-builder-1.18"

# Check that key files exist
dir README.md
dir .gitignore
dir package.json
dir vercel.json
```

✅ **Expected:** All files should exist

### Step 2: Create .env File

```bash
# Copy example to actual .env
copy .env.example .env

# Edit .env and add your API key
notepad .env
```

Add this line:
```
OPENROUTER_API_KEY=sk-or-v1-YOUR-ACTUAL-KEY-HERE
```

⚠️ **Important:** Never commit this .env file!

---

## Part 2: Initialize Git (5 minutes)

### Step 3: Initialize Git Repository

```bash
# Initialize git
git init

# Check git status
git status
```

✅ **Expected:** Should show untracked files

### Step 4: Make First Commit

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: Welsh Government Data Chatbot v1.0.0"
```

✅ **Expected:** Commit successful, should show file count

---

## Part 3: Push to GitHub (10 minutes)

### Step 5: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name: `arcgis-welsh-chatbot` (or your preferred name)
4. Description: `AI-powered chatbot for Welsh Government spatial data`
5. Choose **Public** or **Private**
6. ❌ **Don't** initialize with README (we already have one)
7. Click **Create repository**

### Step 6: Connect to GitHub

```bash
# Add remote (replace with YOUR username/repo)
git remote add origin https://github.com/YOUR_USERNAME/arcgis-welsh-chatbot.git

# Verify remote
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

Enter your GitHub credentials when prompted.

✅ **Expected:** Code should appear on GitHub

### Step 7: Verify on GitHub

1. Refresh your GitHub repository page
2. Verify files are there:
   - ✅ README.md displays nicely
   - ✅ .gitignore is present
   - ✅ .env is NOT present (good!)
   - ✅ All widget files are there

---

## Part 4: Deploy to Vercel (10 minutes)

### Step 8: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

✅ **Expected:** Logged into Vercel dashboard

### Step 9: Import Project

1. Click **Add New...** → **Project**
2. Find your repository: `arcgis-welsh-chatbot`
3. Click **Import**

### Step 10: Configure Build Settings

**Framework Preset:** Other

**Root Directory:** `./` (leave as is)

**Build & Development Settings:**

- **Build Command:**
  ```bash
  cd client && npm install && npm run build
  ```

- **Output Directory:**
  ```
  client/dist
  ```

- **Install Command:**
  ```bash
  npm install
  ```

**Environment Variables:**
- Click **Add**
- Name: `NODE_ENV`
- Value: `production`

### Step 11: Deploy

1. Click **Deploy**
2. Wait 2-5 minutes for build to complete
3. Watch the build logs

✅ **Expected:** 
- ✅ Install dependencies
- ✅ Build client
- ✅ Deploy successful
- ✅ Green checkmark

### Step 12: Get Your URL

After deployment:
1. You'll see: **🎉 Congratulations!**
2. Your URL: `https://your-project-name.vercel.app`
3. Click **Visit** to open your app

---

## Part 5: Configure Widget (5 minutes)

### Step 13: Open Your Deployed App

1. Visit your Vercel URL
2. You should see ArcGIS Experience Builder
3. Add the Chatbot widget (if not already added)

### Step 14: Configure OpenRouter API

1. Click the **⚙️ settings** button on the widget
2. Enter your OpenRouter API Key: `sk-or-v1-...`
3. Enter model: `mistralai/mistral-7b-instruct`
4. Click **Save**

### Step 15: Test Your Chatbot

Type these commands:

```
help
schools in Cardiff
zoom to Cardiff CF10 1BH
print
```

✅ **Expected:** All commands should work!

---

## Part 6: Verify Everything (5 minutes)

### Final Checklist

Test each feature:

1. ✅ **Basic Commands**
   - `zoom in` → Map zooms in
   - `list layers` → Shows layers
   - `help` → Shows help

2. ✅ **School Queries**
   - `schools in Swansea` → Shows results
   - `schools with postcode CF10` → Shows results

3. ✅ **Navigation**
   - `zoom to Newport NP20` → Zooms to location

4. ✅ **Print**
   - `print` → Shows template selection
   - Select template → PDF downloads

5. ✅ **Mobile**
   - Open on phone
   - Verify responsive design

---

## 🎉 You're Live!

Your chatbot is now deployed and accessible at:
```
https://your-project-name.vercel.app
```

---

## 📊 What Happens Now?

### Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Update: description"
git push
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy the new version
4. Update your URL (same URL, new version)

### View Deployments

1. Go to [vercel.com](https://vercel.com)
2. Click your project
3. See all deployments
4. View logs, analytics, etc.

---

## 🔧 Troubleshooting

### Build Failed?

**Check Vercel Logs:**
1. Go to Vercel dashboard
2. Click failed deployment
3. View build logs
4. Fix error in code
5. Push again

**Common Issues:**
- Missing dependencies → Add to package.json
- TypeScript errors → Fix in code
- Build command wrong → Update in Vercel settings

### Widget Not Loading?

1. Check browser console (F12)
2. Verify HTTPS is enabled
3. Check API key is entered correctly
4. Verify widget manifest.json

### API Errors?

1. Check OpenRouter API key is valid
2. Verify key has credits
3. Check network tab in browser console
4. Look for CORS errors

---

## 📝 Quick Reference

### Git Commands

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push

# Pull latest
git pull

# View history
git log --oneline
```

### Vercel Commands

```bash
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# View logs
vercel logs
```

### Update Widget

```bash
# Make changes to widget files
# Then:
git add .
git commit -m "Update widget: description of changes"
git push

# Vercel auto-deploys!
```

---

## 🎯 Next Steps

1. ✅ Share your URL with team
2. ✅ Add custom domain (optional)
3. ✅ Enable Vercel Analytics
4. ✅ Set up monitoring
5. ✅ Add more features
6. ✅ Create documentation for users

---

## 📞 Need Help?

- 📖 Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide
- 🐛 Check [CHECKLIST.md](CHECKLIST.md) for pre-deployment checks
- 💬 Open an issue on GitHub
- 📧 Contact Vercel support

---

**Congratulations! Your app is live! 🚀**

Your URL: `https://_____________________.vercel.app`

Date deployed: `_____________________`

Version: `v1.0.0`
