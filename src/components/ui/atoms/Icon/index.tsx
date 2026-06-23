import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  containerClassName?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.gray[600],
  className = '',
  containerClassName = '',
}) => {
  return (
    <View className={cn('justify-center items-center', containerClassName)}>
      <Ionicons
        name={name as any}
        size={size}
        color={color}
        className={className}
      />
    </View>
  );
};
