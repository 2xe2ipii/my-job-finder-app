import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useTheme } from '../context/ThemeContext';

import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="JobFinder"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light,
          },
        }}
      >
        <Stack.Screen name="JobFinder" component={JobFinderScreen} />
        <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 