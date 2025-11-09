# Quick Start Guide - AI Chatbot Testing

## Step 1: Configure the Widget

1. Open your Experience Builder
2. Select the Chatbot widget
3. Click Settings (gear icon)
4. Enter configuration:
   - **Map Widget**: Select your map
   - **API Key**: `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`
   - **Model**: `mistralai/mistral-7b-instruct`
5. Save settings

## Step 2: Ensure Map Has Required Layers

Your map should include:
- ✅ NRW_MAIN_RIVERS (rivers layer)
- ✅ state_secondary_schools_wales (schools)
- ✅ Areas_Affecting_Bathing_Waters (bathing waters)
- ✅ NRW_NATIONAL_PARK (national parks)
- ✅ localauthorities (local authority boundaries)

## Step 3: Test Basic Commands First

Click the blue circular chatbot button in the bottom-right corner.

Test these basic commands (no AI needed):
```
help
list layers
zoom in
enable Main Rivers
disable Bathing Waters
print map
```

## Step 4: Test AI Features

### Test 1: School Proximity Analysis
```
Find schools near rivers within 1km
```

**Expected Response:**
- "AI is analyzing your query..."
- "Understanding: spatial_query - find_schools_near_rivers"
- "Executing spatial analysis..."
- Natural language summary of results
- List of schools with distances

---

### Test 2: Water Quality Impact
```
Which schools are affected by water quality zones?
```

**Expected Response:**
- Analysis of schools within bathing water buffer zones
- Count of impacted schools
- Percentage calculation
- List of specific schools and water areas

---

### Test 3: Park Accessibility
```
Show national park accessibility for each local authority
```

**Expected Response:**
- Distance from each LA to nearest park
- Best and worst access statistics
- Ranked list by accessibility

---

### Test 4: Flood Risk
```
Assess flood risk for schools
```

**Expected Response:**
- High risk schools (< 100m from rivers)
- Moderate risk schools (100-300m from rivers)
- Total count assessed

---

### Test 5: Education Opportunities
```
Find education opportunities near parks and rivers
```

**Expected Response:**
- Schools with access to both features
- Distance ratings (Excellent/Good)
- Sorted by best opportunities

---

### Test 6: Local Authority Comparison
```
Compare school distribution across local authorities
```

**Expected Response:**
- School count per LA
- Highest and lowest counts
- Average schools per LA

---

### Test 7: Welsh Language
```
Darganfod ysgolion yn agos at afonydd
```

**Expected Response:**
- "Detected Welsh language, translating..."
- Shows English translation
- Executes query
- Returns results

## Step 5: Verify Chatbot UI

Test UI functionality:
- ✅ Click blue button - chat window opens
- ✅ Click **−** (minimize) - window minimizes but keeps chat history
- ✅ Click blue button again - chat reopens with history preserved
- ✅ Click **×** (close) - chat resets to initial message
- ✅ Type message and press Enter - sends message
- ✅ Messages scroll automatically

## Common Test Queries

### Natural Language Variations
```
How many schools are near main rivers?
Show me schools within 500 meters of rivers
Which schools have good access to national parks?
Find schools at risk of flooding
What are the environmental education opportunities?
Compare schools across councils
```

### Welsh Queries
```
Darganfod ysgolion  (Find schools)
Pa ysgolion sydd mewn perygl?  (Which schools are at risk?)
Dangos parciau cenedlaethol  (Show national parks)
```

## Expected AI Behavior

### Successful Query Flow:
1. **User sends query**
2. **"🤖 AI is analyzing your query..."** - Shows AI is working
3. **"Understanding: [type] - [action]"** - Shows intent parsing
4. **"📊 Executing spatial analysis..."** - Shows analysis running
5. **Natural language response** - AI-generated friendly response
6. **Structured results** - Detailed breakdown with emojis:
   - 🏫 Schools
   - 💧 Water Quality
   - 🏞️ Parks
   - ⚠️ Risks
   - 🌿 Opportunities

### Error Handling:
- **"I'm not sure I understood..."** - Low confidence query
- **"Please configure OpenRouter API key..."** - No API key
- **"No layers found..."** - Missing map layers
- **"Required layers not found"** - Spatial query can't execute

## Debugging

### Check Browser Console
Open DevTools (F12) and check Console tab for:
- API call logs
- Error messages
- Spatial query results

### Common Issues

**Issue**: "Cannot find layer"
- **Fix**: Ensure layer names in map match expected names (case-insensitive search works)

**Issue**: AI not responding
- **Fix**: Check API key in settings, verify internet connection

**Issue**: No schools found near rivers
- **Fix**: Check both layers are loaded and have data in current extent

**Issue**: Welsh translation fails
- **Fix**: API rate limit or connectivity issue, try English query

## Performance Notes

- **AI Intent Parsing**: ~1-2 seconds
- **Spatial Analysis**: ~0.5-3 seconds (depends on feature count)
- **AI Response Generation**: ~1-2 seconds
- **Total Query Time**: ~3-7 seconds

Large datasets may take longer to query.

## Success Criteria

✅ Basic commands work (zoom, layers, print)
✅ AI queries return results within 10 seconds
✅ Welsh detection and translation works
✅ Results include structured data with counts
✅ Error messages are helpful
✅ Chat UI is responsive and smooth
✅ Minimize/close/reopen preserves/resets state correctly

## Next Steps After Testing

1. **Refine queries** - Try complex natural language
2. **Test edge cases** - Queries with no results
3. **Stress test** - Multiple rapid queries
4. **Welsh variations** - Test different Welsh phrasings
5. **Custom features** - Extend with your own spatial analyses

## Contact

If all tests pass: 🎉 Your AI chatbot is ready to use!

If issues persist: Check the main `AI_FEATURES_README.md` for detailed troubleshooting.
