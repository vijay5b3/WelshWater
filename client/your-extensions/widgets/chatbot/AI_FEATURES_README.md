# AI-Powered Chatbot Features

## Overview
Your chatbot widget now includes 10 AI-powered features for analyzing Welsh government spatial data using OpenRouter AI (Mistral-7B-Instruct model).

## Configuration

### 1. Open Widget Settings
- In Experience Builder, select your chatbot widget
- Go to the Settings panel

### 2. Configure AI
- **Map Connection**: Select your map widget
- **OpenRouter API Key**: Enter your API key: `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`
- **Model**: Use `mistralai/mistral-7b-instruct` (default)

Get an API key at: https://openrouter.ai

## AI Features

### 1. 🏫 Smart School Finder
Find schools near specific features with distance criteria.

**Example Queries:**
- "Find schools near rivers within 1km"
- "Show me secondary schools within 500 meters of rivers"
- "Which schools are close to main rivers?"

**Returns:** List of schools with distances to nearest rivers

---

### 2. 💧 Water Quality Impact Analysis
Analyze which schools are within water quality zones.

**Example Queries:**
- "Which schools are affected by water quality zones?"
- "Show schools within 500m of bathing waters"
- "Assess water quality impact on schools"

**Returns:** Count and list of impacted schools with distances

---

### 3. 🏞️ National Park Accessibility
Assess how accessible national parks are from each local authority.

**Example Queries:**
- "Show national park accessibility for each local authority"
- "Which councils have best access to national parks?"
- "Compare park distances by local authority"

**Returns:** Distance from each LA to nearest park, ranked by accessibility

---

### 4. 🌊 River Flood Risk Assessment
Identify schools at risk of flooding based on proximity to rivers.

**Example Queries:**
- "Assess flood risk for schools"
- "Which schools are at high flood risk?"
- "Find schools within 100m of rivers"

**Returns:** High risk and moderate risk schools categorized by distance

---

### 5. 🌿 Environmental Education Opportunities
Find schools with good access to both natural features.

**Example Queries:**
- "Find education opportunities near parks and rivers"
- "Which schools have both park and river access?"
- "Show schools good for environmental education"

**Returns:** Schools ranked by proximity to both parks and rivers

---

### 6. 🏛️ Local Authority Resource Planning
Compare school distribution across different local authorities.

**Example Queries:**
- "Compare school distribution across local authorities"
- "Which local authority has the most schools?"
- "Show me school counts by council"

**Returns:** School count per LA, with highest/lowest/average stats

---

### 7. 🏊 Water Recreation & Schools Analysis
Similar to feature 1 but focused on bathing water areas.

**Example Queries:**
- "Find schools near bathing waters"
- "Which schools are close to swimming areas?"

**Returns:** Schools near water recreation areas

---

### 8. 🌳 Conservation Corridor Mapping
Analyze connections between natural features (advanced feature).

**Example Queries:**
- "Map conservation corridors between rivers and parks"
- "Show ecological connections"

---

### 9. 🚌 School Trip Planning
Route planning for educational trips (requires network analysis).

**Example Queries:**
- "Plan a school trip from [school] to [park]"
- "Best route for environmental education field trip"

---

### 10. 🌡️ Climate Resilience Assessment
Comprehensive risk assessment combining multiple factors.

**Example Queries:**
- "Assess climate resilience of schools"
- "Which schools need climate adaptation plans?"

---

## 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh Language Support

The chatbot automatically detects and translates Welsh queries!

**Example Welsh Queries:**
- "Darganfod ysgolion yn agos at afonydd" (Find schools near rivers)
- "Pa ysgolion sydd mewn perygl o lifogydd?" (Which schools are at flood risk?)

The bot will:
1. Detect Welsh language
2. Translate to English
3. Show the translation
4. Execute the query
5. Respond in English

---

## Basic Commands (No AI Required)

### Zoom Commands
- `zoom in` - Zoom in one level
- `zoom out` - Zoom out one level
- `zoom to level 10` - Zoom to specific level
- `current zoom` - Show current zoom level

### Layer Commands
- `list layers` - Show all available layers
- `enable [layer name]` - Turn on a layer
- `disable [layer name]` - Turn off a layer
- `show [layer name]` - Turn on a layer
- `hide [layer name]` - Turn off a layer

Examples:
- `enable Bathing Waters`
- `disable Main Rivers`
- `show National Park`

### Print Commands
- `print map` or `print` - Print the current map view

### Help
- `help` - Show all available commands

---

## How It Works

### Architecture

1. **OpenRouterService** (`openRouterService.ts`)
   - Handles AI API calls to OpenRouter
   - Methods:
     - `parseIntent()` - Converts natural language to structured intents
     - `generateResponse()` - Creates friendly responses from results
     - `translateWelsh()` - Welsh to English translation
     - `suggestAnalysis()` - Suggests analysis based on visible layers

2. **AISpatialService** (`aiSpatialService.ts`)
   - Executes spatial queries on the map
   - Methods for each of the 10 AI features
   - Uses ArcGIS JavaScript API geometry engine

3. **Widget** (`widget.tsx`)
   - Main chatbot UI component
   - Routes queries to AI or basic command parser
   - Displays results in chat interface

### Query Flow

```
User Query
    ↓
Detect if Welsh → Translate
    ↓
Parse Intent (AI)
    ↓
Execute Spatial Query
    ↓
Generate Natural Language Response (AI)
    ↓
Display Results in Chat
```

---

## Available Data Layers

The chatbot works with these Welsh Government data layers:

1. **NRW_MAIN_RIVERS** - Main rivers in Wales
2. **NRW_NATIONAL_PARK** - National parks
3. **state_secondary_schools_wales** - Secondary schools
4. **Areas_Affecting_Bathing_Waters** - Bathing water quality zones
5. **localauthorities** - Local authority boundaries

*Make sure these layers are added to your map for AI features to work!*

---

## API Configuration

- **API Provider**: OpenRouter
- **Model**: Mistral-7B-Instruct
- **Base URL**: `https://openrouter.ai/api/v1`
- **Temperature**: 0.3 (focused responses)
- **Max Tokens**: 6000
- **Your API Key**: `sk-or-v1-8fa4b609...`

---

## Testing

### Test Query Examples

1. **Basic spatial query:**
   ```
   Find schools near rivers within 1km
   ```

2. **Water quality analysis:**
   ```
   Which schools are affected by water quality zones?
   ```

3. **Accessibility assessment:**
   ```
   Show national park accessibility for each local authority
   ```

4. **Welsh language:**
   ```
   Darganfod ysgolion yn agos at afonydd
   ```

---

## Troubleshooting

### "Please configure OpenRouter API key"
- Go to widget settings and enter your API key

### "No layers found matching..."
- Check that Welsh Government layers are added to your map
- Layer names must match: rivers, schools, bathing, park, localauthorit

### AI queries not working
- Verify API key is correct
- Check browser console for errors
- Ensure internet connection for AI API calls

### Welsh translation not working
- API might be rate-limited
- Check console for API errors
- Try rephrasing in English

---

## Future Enhancements

Features 7-10 currently return placeholder responses. To fully implement:

1. **Water Recreation Analysis**: Implement similar to feature 1
2. **Conservation Corridors**: Add network analysis for ecological connections
3. **School Trip Planning**: Integrate routing API
4. **Climate Resilience**: Combine flood risk + multiple environmental factors

---

## File Structure

```
chatbot/
├── src/
│   ├── runtime/
│   │   ├── widget.tsx              # Main chatbot component
│   │   ├── openRouterService.ts    # AI service (OpenRouter API)
│   │   ├── aiSpatialService.ts     # Spatial analysis service
│   │   └── widget.css              # Styles
│   ├── setting/
│   │   └── setting.tsx             # Configuration panel
│   ├── config.ts                   # TypeScript config interface
│   └── icon.svg                    # Widget icon
├── manifest.json                   # Widget manifest
└── AI_FEATURES_README.md          # This file
```

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all data layers are loaded
3. Confirm API key is configured
4. Test with basic commands first

---

## Credits

- **Built with**: ArcGIS Experience Builder SDK
- **AI Provider**: OpenRouter
- **AI Model**: Mistral-7B-Instruct
- **Data Source**: Welsh Government Data Portal (datamap.gov.wales)
