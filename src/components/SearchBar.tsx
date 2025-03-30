import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange,
  onClear
}) => {
  const { isDarkMode } = useTheme();
  
  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? COLORS.background.dark : COLORS.background.light,
    ...SHADOWS.small
  };
  
  const inputStyle = {
    ...styles.input,
    color: isDarkMode ? COLORS.text.dark : COLORS.text.light,
    backgroundColor: isDarkMode ? '#2a2a2a' : COLORS.lightGray,
  };

  return (
    <View style={containerStyle}>
      <View style={styles.inputContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isDarkMode ? COLORS.white : COLORS.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={inputStyle}
          placeholder="Search for jobs..."
          placeholderTextColor={isDarkMode ? COLORS.lightGray : COLORS.gray}
          value={searchTerm}
          onChangeText={onSearchChange}
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={isDarkMode ? COLORS.white : COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 12,
  },
  input: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 40,
    fontSize: SIZES.medium,
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
});

export default SearchBar; 