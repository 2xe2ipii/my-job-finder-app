import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants';
import { Ionicons } from '@expo/vector-icons';

interface LogoProps {
  size?: 'small' | 'large';
  isDarkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'large', isDarkMode = false }) => {
  const fontSize = size === 'large' ? SIZES.xLarge : SIZES.medium;
  const iconSize = size === 'large' ? 24 : 18;
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.logoCircle,
        { 
          backgroundColor: COLORS.primary,
          width: iconSize * 1.5,
          height: iconSize * 1.5,
          borderRadius: iconSize * 0.75
        }
      ]}>
        <Ionicons name="briefcase" size={iconSize} color={COLORS.white} />
      </View>
      <Text style={[
        styles.logoText,
        { 
          fontSize,
          color: isDarkMode ? COLORS.text.dark : COLORS.text.light
        }
      ]}>
        <Text style={styles.exclamation}>!</Text>
        tambay
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontWeight: FONT.bold,
  },
  exclamation: {
    color: COLORS.primary,
    fontWeight: FONT.bold,
  }
});

export default Logo; 