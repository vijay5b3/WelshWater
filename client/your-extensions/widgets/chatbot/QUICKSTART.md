# Quick Start Guide - Map Chatbot Widget

## Step 1: Start the Experience Builder Server

Navigate to the server directory and start the server:

```powershell
cd "c:\Users\Vijay Kumar Bobbadi\Downloads\arcgis-experience-builder-1.18\server"
npm start
```

Wait for the server to start. It should open your browser to `https://localhost:3001`

## Step 2: Access Experience Builder

1. Open your browser to `https://localhost:3001` if it doesn't open automatically
2. Sign in with your ArcGIS Online credentials
3. Click "Create New Experience" or open an existing experience

## Step 3: Add the Map Chatbot Widget

1. In the Experience Builder interface:
   - Click the **"+"** button to add a widget
   - Look for **"Map Chatbot"** in the widget list
   - Drag it onto your page

2. If you don't have a Map widget yet:
   - First, add a **Map** widget to your page
   - Configure the map with your desired basemap

## Step 4: Configure the Chatbot

1. Select the Map Chatbot widget
2. Click the **Settings** icon (gear/cog icon)
3. In the settings panel:
   - Under "Select Map Widget", choose your map widget from the dropdown
   - Click outside the panel or the X to save

## Step 5: Test the Widget

Now you can test the chatbot! Try these commands:

1. Type **"zoom in"** and press Enter
   - The map should zoom in by one level

2. Type **"zoom out"** and press Enter
   - The map should zoom out by one level

3. Type **"zoom to level 10"** and press Enter
   - The map should jump to zoom level 10

4. Type **"list layers"** and press Enter
   - See all available layers in your map

5. Type **"enable [layer name]"** and press Enter
   - Turn on a specific layer

6. Type **"disable [layer name]"** and press Enter
   - Turn off a specific layer

7. Type **"print"** or **"give print"** and press Enter
   - A dialog will appear with available print templates
   - Click on a template (e.g., "A4 Portrait")
   - Wait for the print service to process
   - Your printed map will open in a new window

8. Type **"help"** to see all available commands

## Troubleshooting

### Widget doesn't appear in the widget list
- Make sure the server is fully started
- Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check the server console for any errors

### "Please configure a map widget in settings" message
- You need to configure which map the chatbot controls
- Follow Step 4 above

### Commands don't work
- Ensure the map widget is fully loaded (you should see the map)
- Check that you selected the correct map in settings
- Open browser DevTools (F12) and check Console for errors

## Next Steps

Once your chatbot is working:
- Customize the welcome message in `src/runtime/widget.tsx`
- Add more commands by extending the `parseCommand` function
- Style the chatbot by modifying the CSS-in-JS styles
- Add your own custom map interactions

## File Locations

- **Widget Source**: `client/your-extensions/widgets/chatbot/`
- **Runtime Component**: `client/your-extensions/widgets/chatbot/src/runtime/widget.tsx`
- **Settings Panel**: `client/your-extensions/widgets/chatbot/src/setting/setting.tsx`
- **Configuration**: `client/your-extensions/widgets/chatbot/config.json`

## Commands Reference

| Command | Description | Example |
|---------|-------------|---------|
| `zoom in` | Zoom in one level | "zoom in" |
| `zoom out` | Zoom out one level | "zoom out" |
| `zoom to level [N]` | Zoom to specific level (0-23) | "zoom to level 12" |
| `current zoom` | Show current zoom level | "current zoom" |
| `print` | Print the map | "print" or "give print" |
| `list layers` | Show all layers and their status | "list layers" |
| `enable [name]` | Turn on a layer | "enable streets" |
| `disable [name]` | Turn off a layer | "disable imagery" |
| `show [name]` | Turn on a layer (alternative) | "show roads" |
| `hide [name]` | Turn off a layer (alternative) | "hide labels" |
| `help` | Show all commands | "help" |

Enjoy your new Map Chatbot Widget! 🤖🗺️
