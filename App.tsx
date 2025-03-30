import 'react-native-get-random-values';
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { JobsProvider } from './src/context/JobsContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <JobsProvider>
        <AppNavigator />
      </JobsProvider>
    </ThemeProvider>
  );
}
