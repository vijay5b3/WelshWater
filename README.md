# ArcGIS Experience Builder - Welsh Government Data Chatbot

AI-powered chatbot widget for ArcGIS Experience Builder that provides intelligent querying of Welsh government spatial data layers.

## 🌟 Features

### 🤖 AI-Powered Queries
- Natural language understanding using OpenRouter AI
- Query schools by town, postcode, name, or attributes
- Welsh language support (Cymraeg)
- Smart context-aware follow-up questions

### 📍 Navigation
- Geocode and zoom to any UK address or postcode
- Navigate to landmarks and places
- Multi-level zoom controls

### 🗺️ Layer Management
- Enable/disable map layers by name
- Bulk layer operations (enable/disable all)
- List all available layers

### 🏫 School Data Queries
- Find schools by town/city (e.g., "schools in Cardiff")
- Find schools by postcode area (e.g., "schools with postcode CF10")
- Find schools by code (e.g., "school code 6604025")
- Filter by language (Welsh, English, Bilingual)
- Multi-attribute filtering (e.g., "Welsh medium schools in Swansea")

### 🖨️ Print
- Multiple print template options
- A3, A4, Letter, Tabloid formats
- Landscape and Portrait orientations

### 🌊 Spatial Analysis (Advanced)
- Schools near rivers analysis
- Water quality impact assessment
- Flood risk assessment
- Park accessibility analysis
- Environmental education opportunities

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- ArcGIS Experience Builder 1.18
- OpenRouter API Key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd arcgis-experience-builder-1.18
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   
   cd ../server
   npm install
   ```

3. **Configure the Chatbot Widget**
   - Open ArcGIS Experience Builder
   - Add the Chatbot widget to your app
   - Go to widget settings (⚙️)
   - Enter your OpenRouter API Key
   - Select AI model (e.g., `mistralai/mistral-7b-instruct`)
   - Save settings

4. **Start Development Server**
   ```bash
   # Terminal 1 - Client
   cd client
   npm start
   
   # Terminal 2 - Server
   cd server
   npm start
   ```

5. **Access the app**
   - Open browser: `https://localhost:3001`

## 🔑 OpenRouter API Setup

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Generate an API key
4. Add the key to your widget settings

**Recommended Models:**
- `mistralai/mistral-7b-instruct` (Fast, cost-effective)
- `openai/gpt-3.5-turbo` (Better accuracy)
- `anthropic/claude-2` (Most accurate)

## 💬 Example Queries

### Basic Commands
```
zoom in
zoom to Cardiff CF10 1BH
list layers
enable NRW Main Rivers
print
help
```

### School Queries
```
schools in Cardiff
schools with postcode SA1
find school code 6604025
Welsh medium schools
bilingual schools in Swansea
schools around Newport
schools with name High School
```

### Welsh Language
```
ysgol yn Caerdydd
ysgolion Cymraeg yn Abertawe
```

### Advanced Queries
```
schools near rivers
assess flood risk for schools
compare school distribution across local authorities
```

## 📁 Project Structure

```
arcgis-experience-builder-1.18/
├── client/
│   ├── your-extensions/
│   │   └── widgets/
│   │       └── chatbot/               # Main chatbot widget
│   │           ├── src/
│   │           │   ├── runtime/
│   │           │   │   ├── widget.tsx           # Main widget component
│   │           │   │   ├── aiSpatialService.ts  # Spatial analysis service
│   │           │   │   └── openRouterService.ts # AI service
│   │           │   ├── setting/
│   │           │   │   ├── setting.tsx          # Widget settings UI
│   │           │   │   └── translations/
│   │           │   └── config.ts                # Widget configuration
│   │           ├── manifest.json
│   │           └── icon.svg
│   ├── package.json
│   └── tsconfig.json
├── server/
│   ├── src/
│   ├── package.json
│   └── version.json
├── .gitignore
├── README.md
└── version.json
```

## 🎨 Widget Components

### 1. **widget.tsx** - Main Chatbot Interface
- Floating circular button with bot icon
- Chat message display
- Command parsing and routing
- AI query handler
- Context management for follow-up questions

### 2. **openRouterService.ts** - AI Integration
- Intent parsing from natural language
- Response generation
- Welsh translation
- Configurable model and parameters

### 3. **aiSpatialService.ts** - Spatial Analysis
- Query by attribute (town, postcode, code, language)
- Spatial analysis operations
- Distance calculations with SR handling
- Multi-layer queries

### 4. **setting.tsx** - Configuration Panel
- OpenRouter API Key input
- Model selection
- Settings validation

## 🔧 Configuration

### Widget Configuration (`config.ts`)
```typescript
interface Config {
  openRouterApiKey: string;
  openRouterModel: string;
}
```

### AI Service Configuration
- **Base URL**: `https://openrouter.ai/api/v1`
- **Temperature**: 0.3 (for consistent responses)
- **Max Tokens**: 6000
- **Default Model**: `mistralai/mistral-7b-instruct`

## 🌍 Data Layers

The chatbot works with these Welsh government data layers:

1. **state_secondary_schools_wales** - Secondary schools
2. **NRW_MAIN_RIVERS** - Rivers in Wales
3. **NRW_NATIONAL_PARK** - National parks
4. **Areas_Affecting_Bathing_Waters** - Bathing water quality zones
5. **localauthorities** - Local authority boundaries

## 🧪 Testing

### Test Categories

**1. Navigation (5 tests)**
- Zoom controls
- Address geocoding
- Place name search

**2. Layer Management (3 tests)**
- List layers
- Enable/disable layers
- Bulk operations

**3. Print (1 test)**
- Template selection

**4. School Queries (11 tests)**
- By town/city
- By postcode
- By code
- By language
- Multi-attribute

See the full test suite in the documentation.

## 🚢 Deployment

### Development Build
```bash
cd client
npm run build:dev
```

### Production Build
```bash
cd client
npm run build
```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard
   - Add `OPENROUTER_API_KEY` (optional, if server-side)

### Deploy to Custom Server

1. Build the project
2. Copy `client/dist` to web server
3. Copy `server` folder
4. Run `node server/src/server.js`
5. Configure reverse proxy (nginx/Apache)

## 📝 License

This project is based on ArcGIS Experience Builder 1.18. See the `3rd-party-license.txt` for third-party licenses.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the ArcGIS Experience Builder documentation
- Visit the OpenRouter AI documentation

## 🔄 Version History

### v1.0.0 (Current)
- AI-powered natural language queries
- Postcode and town-based school search
- Welsh language support
- Print template selection
- Navigation with geocoding
- Layer management
- Spatial analysis features

## 🙏 Acknowledgments

- ArcGIS Experience Builder by Esri
- OpenRouter AI platform
- Welsh Government Open Data
- Natural Resources Wales (NRW)

## ⚠️ Important Notes

1. **API Key Security**: Never commit your OpenRouter API key to version control
2. **Data Privacy**: School data is public Welsh government data
3. **Performance**: Large queries may take time, especially spatial analysis
4. **Browser Support**: Modern browsers (Chrome, Firefox, Edge, Safari)
5. **HTTPS Required**: Geocoding and some features require HTTPS

---

**Built with ❤️ for Welsh Government Data Analysis**
