import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useTheme } from '../context/ThemeContext';

interface DarkModeToggleProps {
  style?: any;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ style }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={toggleTheme}
      accessibilityLabel="Toggle dark mode"
    >
      <Ionicons
        name={isDarkMode ? 'sunny' : 'moon'}
        size={24}
        color={isDarkMode ? COLORS.primary : COLORS.primaryDark}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
  },
});

export default DarkModeToggle; 