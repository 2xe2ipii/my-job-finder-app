# Job Finder App

A mobile application built with React Native and Expo that allows users to search for jobs, save jobs, and apply for jobs.

## Features

- Browse and search for jobs
- Save jobs to view later
- Apply for jobs with a detailed application form
- Dark mode support
- Responsive UI design

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- React Context API for state management

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd job-finder-app
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Scan the QR code with the Expo Go app (Android) or the Camera app (iOS) to open the app on your mobile device.

## Project Structure

```
job-finder-app/
├── assets/              # Contains app assets like images and fonts
├── src/                 # Source files
│   ├── components/      # Reusable UI components
│   ├── constants/       # App constants, theme variables
│   ├── context/         # React Context for state management
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── App.tsx              # App entry point
```

## API

The app fetches job data from the Empllo API (https://empllo.com/api/v1). If the API is unavailable, the app will use mock data.

## License

This project is licensed under the MIT License. 