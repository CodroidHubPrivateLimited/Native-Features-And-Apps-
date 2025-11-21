# Notification App - Updated Version

A simple and clean notification app built with the latest Expo SDK and React Native.

## Features

- ✅ Send immediate notifications
- ✅ Schedule notifications (5 seconds delay)
- ✅ Cancel all scheduled notifications
- ✅ Works on iOS, Android, and Web
- ✅ Clean, easy-to-understand code

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

```bash
# Navigate to the app directory
cd updated/notification-app

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

1. **Request Permissions**: The app automatically requests notification permissions when it starts
2. **Send Immediate Notification**: Tap the button to send a notification right away
3. **Schedule Notification**: Tap to schedule a notification for 5 seconds later
4. **Cancel All**: Cancel all scheduled notifications

## Code Structure

The app is built with a single, easy-to-understand file:

- `App.tsx` - Main app component with all notification logic
- `app.json` - Expo configuration with notification plugin
- `package.json` - Dependencies (latest versions)

## Key Features of This Version

- ✨ **Latest Libraries**: Uses Expo SDK 54 with latest expo-notifications
- 📝 **Simple Code**: All code in one file, easy to read and understand
- 🎨 **Clean UI**: Modern, simple interface
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔔 **Easy to Use**: Just three buttons for all functionality

## Technologies Used

- React Native 0.81.5
- Expo SDK 54
- Expo Notifications 0.32.12
- TypeScript 5.9.2

## Troubleshooting

### Notifications not working?

1. Make sure you granted notification permissions when prompted
2. On Android, check device notification settings
3. On iOS, check Settings > Notifications > [App Name]

### Permission denied?

- Go to device settings and enable notifications for the app
- On web, check browser notification settings

## License

This project is for educational purposes.

