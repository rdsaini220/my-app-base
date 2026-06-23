import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/atoms/Text';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ text = 'OR CONTINUE WITH' }) => {
  return (
    <View className="flex-row justify-center items-center">
      <View className="h-px bg-border flex-1" />
      <Text variant="muted" size="l2" className="font-bold mx-4 tracking-wider">
        {text}
      </Text>
      <View className="h-px bg-border flex-1" />
    </View>
  );
};
