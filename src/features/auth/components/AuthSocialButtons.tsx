import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';

export const AuthSocialButtons = () => {
  const { isDark } = useTheme();
  return (
    <View className="flex-row justify-center space-x-4">
      <TouchableOpacity className="w-14 h-14 rounded-xl bg-card border border-border justify-center items-center">
        <Ionicons name="logo-google" size={22} color={isDark ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity className="w-14 h-14 rounded-xl bg-card border border-border justify-center items-center ml-4">
        <Ionicons name="logo-apple" size={22} color={isDark ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};
