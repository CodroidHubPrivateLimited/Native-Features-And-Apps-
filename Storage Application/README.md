# Data Storage App - Updated Version

A simple and clean data storage app built with the latest Expo SDK and React Native.

## Features

- ✅ **File Storage**: Upload files (images, documents) and add descriptions
- ✅ **Shared Preferences**: Store key-value pairs (like settings or user data)
- ✅ **View All Data**: View all stored files and preferences in a modal
- ✅ **Delete Functionality**: Delete files and preferences
- ✅ **Cross-Platform**: Works on iOS, Android, and Web
- ✅ **Clean Code**: Simple, easy-to-understand structure

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

```bash
# Navigate to the app directory
cd updated/data-storage-app

# Install dependencies (already done)
npm install

# Start the app
npm start
```

### Run on Different Platforms

- **Web**: Press `w` in terminal or visit the URL shown
- **Android**: Press `a` in terminal or scan QR code with Expo Go
- **iOS**: Press `i` in terminal or scan QR code with Expo Go

## How It Works

### File Storage
1. Click "Upload File" to select a file from your device
2. Add a description for the file
3. Click "Save File" to store it

### Shared Preferences
1. Enter a key (e.g., "username")
2. Enter a value (e.g., "John Doe")
3. Click "Save Shared Preference" to store it

### View All Data
1. Click "View All Stored Data" button
2. See all your files and preferences
3. Delete any item by clicking the "Delete" button

## Project Structure

```
data-storage-app/
├── App.tsx                    # Main app component
├── types.ts                   # TypeScript type definitions
├── styles/
│   └── index.styles.ts        # All styles
├── utils/
│   └── storage.ts             # Storage utility functions
└── package.json               # Dependencies
```

## Key Features of This Version

- ✨ **Latest Libraries**: Uses Expo SDK 54 with latest packages
- 📝 **Simple Code**: Clean, well-organized, easy to understand
- 🎨 **Modern UI**: Clean interface with organized sections
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔧 **Easy to Maintain**: Separated styles and utilities

## Technologies Used

- React Native 0.81.5
- Expo SDK 54
- Expo File System 19.0.17
- Expo Image Picker 17.0.8
- AsyncStorage 2.2.0
- TypeScript 5.9.2

## Storage Details

- **Files**: Stored in device's document directory (native) or AsyncStorage (web)
- **Preferences**: Stored in AsyncStorage (key-value pairs)
- **File Metadata**: Descriptions are stored separately in AsyncStorage

## Troubleshooting

### Files not uploading?

1. Make sure you granted media library permissions when prompted
2. On Android, check device storage permissions
3. On iOS, check Settings > Privacy > Photos

### Data not persisting?

- Files are stored in the app's document directory
- Preferences are stored in AsyncStorage
- Data persists between app restarts

## License

This project is for educational purposes.

