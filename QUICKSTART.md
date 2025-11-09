# 🚀 Quick Start Guide

Get your Welsh Government Data Chatbot up and running in 5 minutes!

## ⚡ Prerequisites

- ✅ Node.js 16+ ([Download](https://nodejs.org/))
- ✅ Git ([Download](https://git-scm.com/))
- ✅ OpenRouter API Key ([Get Free Key](https://openrouter.ai/))

## 📦 Installation

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd arcgis-experience-builder-1.18

# Install all dependencies
npm run install:all
```

### 2. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up (free)
3. Go to "Keys" section
4. Create new key
5. Copy your key (starts with `sk-or-v1-...`)

### 3. Start Development Server

```bash
# Terminal 1 - Start client (port 3000)
cd client
npm start

# Terminal 2 - Start server (port 3001)
cd server
npm start
```

**Or use concurrently:**
```bash
npm run dev
```

### 4. Configure Widget

1. Open browser: `https://localhost:3001`
2. Add Chatbot widget to your app
3. Click settings button (⚙️)
4. Paste your OpenRouter API key
5. Enter model: `mistralai/mistral-7b-instruct`
6. Click Save

## ✨ First Test

Type these commands in the chatbot:

```
help
schools in Cardiff
zoom to Cardiff CF10 1BH
print
```

## 🎯 That's It!

Your chatbot is ready! Try these queries:

**School Queries:**
- `schools in Swansea`
- `schools with postcode SA1`
- `Welsh medium schools`

**Navigation:**
- `zoom to Newport NP20 1DW`
- `navigate to Brecon`

**Layers:**
- `list layers`
- `enable NRW Main Rivers`

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [example queries](#example-queries) below

## 🐛 Troubleshooting

### Port Already in Use?

```bash
# Kill process on port 3001
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill
```

### SSL Certificate Error?

Accept the self-signed certificate in your browser.

### Widget Not Loading?

1. Clear browser cache
2. Check browser console for errors
3. Verify widget manifest.json
4. Restart dev server

## 💡 Tips

1. **Free API Credits**: OpenRouter gives free credits for testing
2. **Best Model**: Start with `mistralai/mistral-7b-instruct` (fast & cheap)
3. **HTTPS Required**: Geocoding needs HTTPS (dev server uses self-signed cert)
4. **Hot Reload**: Changes auto-reload during development

## 📋 Example Queries

### Basic Commands
```
zoom in
zoom out
current zoom
list layers
print
help
```

### School Searches
```
schools in Cardiff
schools around Swansea
schools with postcode CF10
find school code 6604025
Welsh medium schools
bilingual schools in Newport
schools with name High School
```

### Navigation
```
zoom to Cardiff CF10 1BH
navigate to Swansea SA1 1AA
go to Brecon Beacons
zoom to Caernarfon Castle
```

### Layer Control
```
enable NRW Main Rivers
disable Bathing Waters
show National Parks
hide all layers
```

### Welsh Language
```
ysgol yn Caerdydd
ysgolion Cymraeg yn Abertawe
help yn Gymraeg
```

### Advanced Spatial
```
schools near rivers
assess flood risk for schools
compare school distribution
```

## 🎓 Learning Resources

- [ArcGIS Experience Builder Docs](https://developers.arcgis.com/experience-builder/)
- [OpenRouter AI Docs](https://openrouter.ai/docs)
- [ArcGIS JS API](https://developers.arcgis.com/javascript/)

## 🆘 Need Help?

- 📖 Read the [full README](README.md)
- 🐛 [Open an issue](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)
- 💬 Check existing issues

---

**Happy Coding! 🎉**

Need to deploy? See [DEPLOYMENT.md](DEPLOYMENT.md)
