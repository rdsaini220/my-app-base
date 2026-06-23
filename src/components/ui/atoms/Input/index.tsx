import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

export interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  
  // Slots and Icons
  leftIcon?: string;
  rightIcon?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  
  error?: boolean;
  className?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  onFocus,
  onBlur,
  editable = true,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  leftSlot,
  rightSlot,
  error = false,
  className = '',
  inputClassName = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;
  const actualSecureTextEntry = isPassword ? !showPassword : false;

  return (
    <View
      className={cn(
        'flex-row items-center bg-card border rounded-2xl px-4 overflow-hidden h-16 w-full transition-all',
        error
          ? 'border-error'
          : isFocused
          ? 'border-primary'
          : 'border-border',
        className
      )}
    >
      {leftSlot && <View className="mr-2">{leftSlot}</View>}
      
      {leftIcon && (
        <TouchableOpacity
          disabled={!onLeftIconPress}
          onPress={onLeftIconPress}
          className="mr-2 justify-center items-center"
        >
          <Ionicons name={leftIcon as any} size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={actualSecureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
        onFocus={() => {
          setIsFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur();
        }}
        className={cn(
          'flex-1 text-foreground font-sans text-base h-full py-0',
          !editable && 'opacity-60',
          inputClassName
        )}
        style={{ textAlignVertical: multiline ? 'top' : 'center' }}
      />

      {rightSlot && <View className="ml-2">{rightSlot}</View>}

      {isPassword ? (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="ml-2 justify-center items-center"
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.gray[600]}
          />
        </TouchableOpacity>
      ) : (
        rightIcon && (
          <TouchableOpacity
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            className="ml-2 justify-center items-center"
          >
            <Ionicons name={rightIcon as any} size={20} color={colors.gray[600]} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};
