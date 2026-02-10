# Date/Time List Inserter - Chrome Extension

A Chrome extension to easily insert formatted date/time lists for job hunting emails and scheduling. Automatically formats dates with Japanese weekdays (月火水木金土日) in the format commonly used for interview scheduling.

## Features

- **Right-Click Context Menu**: Insert date/time lists from any text field
- **Calendar Date Picker**: Visual calendar for easy date selection
- **Time Range Selection**: Pick start and end times for each preference
- **Multiple Slots**: Add up to 3+ date/time preferences
- **Japanese Weekday Auto-Fill**: Automatically inserts correct Japanese weekday (月火水木金土日)
- **Live Preview with Editing**: See and edit the formatted output before inserting
- **Time Templates**: Save and reuse common time slots
- **Universal Compatibility**: Works on all websites (Gmail, Outlook, LinkedIn, forms, etc.)

## Output Format

The extension generates text in this format:
```
第1希望：　2024年11月16日（土）　09:00　〜　10:00
第2希望：　2024年11月17日（日）　14:00　〜　15:00
第3希望：　2024年11月18日（月）　16:00　〜　17:00
```

## Installation

### Development Installation

1. **Build the extension**:
   ```bash
   npm install
   npm run build
   ```

2. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### Verify Installation

- You should see the extension icon in your Chrome toolbar
- The extension should appear in your extensions list

## Usage

### Method 1: Right-Click Context Menu

1. Click in any text field (email, form, chat, etc.)
2. Right-click to open context menu
3. Select "Insert Date/Time List"
4. The extension popup will open

### Method 2: Extension Icon

1. Click the extension icon in the Chrome toolbar
2. The popup will open directly

### In the Popup:

1. **Select Dates**: Click the calendar for each preference to choose a date
2. **Set Times**: Use the time pickers to set start and end times
3. **Add/Remove Slots**: Click "+ Add Preference" to add more slots, or the trash icon to remove
4. **Use Templates** (optional): Click a template button to quickly apply preset times
5. **Preview & Edit**: Review the formatted text in the preview area, make manual edits if needed
6. **Insert**: Click the "Insert" button to insert the text at your cursor position

## Templates

The extension comes with default templates:
- **Morning**: 9:00-10:00, 10:00-11:00, 11:00-12:00
- **Afternoon**: 14:00-15:00, 15:00-16:00, 16:00-17:00

You can save your own custom templates for frequently used time ranges.

## Tech Stack

- **TypeScript** - Type-safe code
- **React 18** - UI framework
- **Shadcn/ui** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first styling
- **react-day-picker** - Calendar component
- **Vite** - Fast build tool
- **Chrome Extension Manifest V3** - Latest extension standard

## Development

### Prerequisites

- Node.js 18+ and npm
- Chrome browser

### Setup

```bash
# Install dependencies
npm install

# Run development server (for hot reload)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Project Structure

```
src/
├── background/         # Service worker (context menu)
├── content/           # Content script (text injection)
├── popup/             # Main UI (React app)
│   ├── App.tsx       # Main app component
│   ├── main.tsx      # React entry point
│   └── index.html    # Popup HTML
├── components/        # React components
│   ├── DateTimeSelector.tsx   # Calendar & time pickers
│   ├── PreviewEditor.tsx      # Preview with editing
│   ├── TemplateManager.tsx    # Template management
│   └── ui/                    # Shadcn/ui components
├── lib/               # Utilities
│   ├── dateUtils.ts   # Date formatting & Japanese weekdays
│   └── utils.ts       # General utilities
└── types/             # TypeScript type definitions
```

## Testing

The extension should be tested on various websites:
- Gmail (compose email)
- Outlook Web
- LinkedIn messaging
- Generic web forms
- Slack web
- Discord web

## Troubleshooting

### Extension not loading
- Make sure you ran `npm run build` successfully
- Check that you're loading the `dist` folder, not the project root
- Check Chrome DevTools for any console errors

### Text not inserting
- Make sure you've clicked in the text field first
- Try using the "Copy" button and manually pasting
- Check that the website allows script access

### Icons not showing
- The extension includes placeholder icons
- You can replace them in `public/icons/` with your own (16x16, 32x32, 48x48, 128x128 PNG files)

## Future Enhancements

Potential improvements:
- Dark mode support
- Multiple language support (English, Chinese, etc.)
- More date format options
- Keyboard shortcuts
- Export/import templates
- Cloud sync for templates

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
