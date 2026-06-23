import React, { memo, useState } from 'react';
import { View, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

// --- Interface ---
export interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  onClear?: () => void; // Optional text clear callback
  value?: string;
  isDisabled?: boolean;
  placeholderClassName?: string; // Support style passing from ref SearchBar
  className?: string; // Container className
  inputClassName?: string; // TextInput specific className
}

export const SearchBar = memo(({
  placeholder = 'Search...',
  onClear,
  value = '',
  isDisabled = false,
  placeholderClassName = '',
  className = '',
  inputClassName = '',
  onChangeText,
  onFocus,
  onBlur,
  ...props
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={cn(
        'flex-row items-center bg-muted rounded-full px-4 h-14 border w-full',
        isFocused ? 'border-primary' : 'border-border',
        isDisabled ? 'opacity-50' : 'opacity-100',
        className || placeholderClassName
      )}
    >
      {/* 1. Left Side: Search Icon */}
      <Ionicons
        name="search-outline"
        size={20}
        color={colors.gray[600]}
        className="mr-2"
      />

      {/* 2. Center: Input Field */}
      <TextInput
        editable={!isDisabled}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        value={value}
        onChangeText={onChangeText}
        onFocus={(e) => {
          if (isDisabled) return;
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        className={cn(
          'flex-1 text-foreground font-sans text-base h-full py-0 ml-1',
          inputClassName
        )}
        {...props}
      />

      {/* 3. Right Side: Clear Button */}
      {value && value.length > 0 && onClear && !isDisabled && (
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.7}
          className="ml-2 w-8 h-8 rounded-full justify-center items-center active:bg-muted/80"
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.gray[600]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
