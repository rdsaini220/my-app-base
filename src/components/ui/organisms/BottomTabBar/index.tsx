import React from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';
import { cn } from '@/utils/cn';

interface BottomTabBarProps {
  className?: string;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ className = '' }) => {
  return (
    <View
      className={cn(
        'h-16 flex-row border-t border-border bg-card justify-around items-center',
        className
      )}
    >
      <Text size="l1" variant="muted">
        Bottom Tab Bar Component
      </Text>
    </View>
  );
};
