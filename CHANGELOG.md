# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-09

### Added
- 🤖 AI-powered chatbot widget for ArcGIS Experience Builder
- 🏫 School search by town/city name
- 📮 School search by postcode area
- 🔢 School search by code
- 🗣️ School search by language (Welsh/English/Bilingual)
- 📝 Multi-attribute school queries
- 📍 Navigation to addresses and postcodes via geocoding
- 🗺️ Layer visibility management (enable/disable)
- 🖨️ Print functionality with template selection
- 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh language translation support
- 💬 Conversation context for follow-up questions
- 🌊 Advanced spatial analysis features:
  - Schools near rivers analysis
  - Water quality impact assessment
  - Flood risk assessment
  - Park accessibility analysis
  - Environmental education opportunities
  - Local authority comparison
- ⚙️ Widget settings panel for API configuration
- 📚 Comprehensive documentation (README, QUICKSTART, DEPLOYMENT)
- 🔧 Development environment setup
- 🚀 Vercel deployment configuration

### Technical Details
- OpenRouter AI integration for natural language processing
- ArcGIS JS API 4.x spatial operations
- Geodesic distance calculations with spatial reference handling
- Automatic fallback for failed geocoding
- Manual query parsing for low-confidence AI responses
- TypeScript implementation
- React hooks for state management
- Emotion CSS for styling

### Widget Features
- Floating circular button interface
- Minimize/close functionality
- Message history
- Print template selection dialog
- Real-time AI query processing
- Error handling and user feedback
- Mobile-responsive design

### Data Layers Supported
- state_secondary_schools_wales (Secondary schools in Wales)
- NRW_MAIN_RIVERS (Rivers)
- NRW_NATIONAL_PARK (National parks)
- Areas_Affecting_Bathing_Waters (Water quality zones)
- localauthorities (Local authority boundaries)

### Configuration
- OpenRouter API key configuration
- AI model selection
- Customizable temperature and token limits
- Support for multiple AI models:
  - mistralai/mistral-7b-instruct
  - openai/gpt-3.5-turbo
  - anthropic/claude-2

### Documentation
- README.md with full project documentation
- QUICKSTART.md for fast setup
- DEPLOYMENT.md for production deployment
- CONTRIBUTING.md for contributors
- Example queries and test cases
- Troubleshooting guide

### Files Added
- `client/your-extensions/widgets/chatbot/src/runtime/widget.tsx`
- `client/your-extensions/widgets/chatbot/src/runtime/openRouterService.ts`
- `client/your-extensions/widgets/chatbot/src/runtime/aiSpatialService.ts`
- `client/your-extensions/widgets/chatbot/src/setting/setting.tsx`
- `client/your-extensions/widgets/chatbot/src/config.ts`
- `client/your-extensions/widgets/chatbot/manifest.json`
- `.gitignore`
- `vercel.json`
- `.env.example`
- `LICENSE`
- `package.json`
- `.github/workflows/deploy.yml`

### Known Issues
- None at release

---

## [Unreleased]

### Planned Features
- Historical query search
- Export results to CSV/Excel
- Bookmark favorite queries
- Custom analysis templates
- Map annotation tools
- Multi-language support (more languages)
- Voice input support
- Dashboard with analytics
- Admin panel for configuration
- Batch query processing

---

## Release Notes

### Version 1.0.0 Release Notes

This is the initial release of the Welsh Government Data Chatbot for ArcGIS Experience Builder.

**Key Highlights:**
- Complete AI-powered natural language interface
- Comprehensive school data querying
- Full Welsh government data layer support
- Production-ready deployment configuration
- Extensive documentation

**Breaking Changes:**
- None (initial release)

**Migration Guide:**
- N/A (initial release)

**Upgrade Instructions:**
- Fresh installation from repository

**Deprecations:**
- None

---

[1.0.0]: https://github.com/YOUR_USERNAME/YOUR_REPO/releases/tag/v1.0.0
