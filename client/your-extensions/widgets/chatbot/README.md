# Map Chatbot Widget

A custom chatbot widget for ArcGIS Experience Builder that allows you to control map zoom operations through natural language commands.

## Features

- **Natural Language Commands**: Interact with the map using simple text commands
- **Zoom Control**: Zoom in, zoom out, or jump to specific zoom levels
- **Print Functionality**: Print the current map view with a simple command
- **Layer Management**: Enable or disable map layers by name
- **Layer Discovery**: List all available layers and their status
- **Real-time Feedback**: Get instant confirmation of actions
- **User-friendly UI**: Clean chat interface with message history

## Installation

1. The widget has been created in: `client/your-extensions/widgets/chatbot/`
2. Restart your Experience Builder development server if it's running
3. The widget will appear in the widget panel as "Map Chatbot"

## Configuration

1. **Add the widget to your Experience**:
   - In Experience Builder, open the widget panel
   - Find "Map Chatbot" and drag it onto your page
   
2. **Configure the Map Connection**:
   - Click the widget to select it
   - Click the settings/configuration icon
   - In the settings panel, select which Map widget this chatbot should control
   - Click "Save" or "OK"

## Supported Commands

The chatbot understands the following commands:

### Zoom Commands
- **"zoom in"** or **"zoomin"** - Increases zoom level by 1
- **"zoom out"** or **"zoomout"** - Decreases zoom level by 1
- **"zoom to level [number]"** - Jumps to a specific zoom level (0-23)
  - Examples: "zoom to level 10", "zoom level 15"

### Print Commands
- **"print"** - Displays available print templates from the print service
- **"print map"** - Same as print
- **"give print"** - Same as print
  - After command, select a template from the dialog
  - The map will be printed using the ArcGIS print service
  - Output opens in a new window/tab

### Layer Management Commands
- **"list layers"** - Shows all available layers with their current status (ON/OFF)
- **"enable [layer name]"** - Turns on a specific layer
  - Examples: "enable streets", "enable world imagery"
- **"disable [layer name]"** - Turns off a specific layer
  - Examples: "disable streets", "disable world imagery"
- **"show [layer name]"** - Alternative to enable
- **"hide [layer name]"** - Alternative to disable

### Information Commands
- **"current zoom"** - Displays the current zoom level
- **"help"** - Shows all available commands

## How It Works

The chatbot widget:
1. Connects to your selected Map widget using the `JimuMapViewComponent`
2. Captures your text commands through the chat interface
3. Parses the commands to understand your intent
4. Uses the ArcGIS Maps SDK for JavaScript `view.goTo()` method to control zoom
5. Provides feedback about the action taken

## Technical Details

### Files Structure
```
chatbot/
├── manifest.json          # Widget metadata
├── config.json           # Default configuration
├── icon.svg              # Widget icon
└── src/
    ├── config.ts         # TypeScript configuration interface
    ├── runtime/
    │   ├── widget.tsx    # Main widget component
    │   └── widget.css    # Widget styles
    └── setting/
        └── setting.tsx   # Settings panel component
```

### Key Components
- **JimuMapViewComponent**: Establishes connection to the map widget
- **Message State**: Maintains chat history
- **Command Parser**: Interprets natural language commands
- **Map View API**: Controls zoom through `jimuMapView.view.goTo()`

## Usage Example

**Example 1: Zoom Control**
1. Type "zoom in" in the chat input
2. Press Enter or click Send
3. The map zooms in by one level
4. The chatbot confirms: "Zoomed in to level 12"

**Example 2: Print Map**
1. Type "print" or "give print"
2. Press Enter
3. A dialog appears showing available print templates
4. Click on your desired template (e.g., "A4 Portrait", "Letter Landscape")
5. The print service processes your request
6. The printed map opens in a new window/tab
7. You can download or further print the result

**Example 3: Layer Management**
1. Type "list layers" to see all available layers
2. Type "enable streets" to turn on the streets layer
3. Type "disable imagery" to turn off the imagery layer
4. The chatbot confirms each action

## Extending the Widget

You can add more commands by modifying the `parseCommand` function in `src/runtime/widget.tsx`. Some ideas:

- **Pan commands**: "pan left", "pan right", "pan up", "pan down"
- **Rotation**: "rotate left", "rotate right"
- **Extent**: "zoom to extent", "reset view"
- **Location search**: "go to [place name]"
- **Measurement**: "measure distance", "measure area"
- **Basemap control**: "change basemap to satellite"
- **Layer transparency**: "set layer opacity to 50%"

## Troubleshooting

**Widget shows "Please configure a map widget in settings"**
- Open widget settings and select a map widget

**Commands don't work**
- Ensure the map widget is properly loaded
- Check browser console for errors
- Verify the map widget ID is correctly configured

**Widget not appearing in builder**
- Restart the Experience Builder server
- Check that all files are in the correct location
- Ensure manifest.json is valid JSON

## Version

- Widget Version: 1.0.0
- Compatible with: ArcGIS Experience Builder 1.18.0

## License

http://www.apache.org/licenses/LICENSE-2.0
