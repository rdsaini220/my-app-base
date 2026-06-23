import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'small',
  color,
  className = '',
}) => {
  const { colors } = useTheme();
  return (
    <View className={cn('justify-center items-center p-2', className)}>
      <ActivityIndicator
        size={size}
        color={color || colors.primary}
      />
    </View>
  );
};
