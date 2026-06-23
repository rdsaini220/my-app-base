import React from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';
import { cn } from '@/utils/cn';

interface AppDrawerProps {
  className?: string;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ className = '' }) => {
  return (
    <View className={cn('flex-1 p-6 bg-card border-r border-border', className)}>
      <Text size="h4" className="font-bold text-foreground mb-4">
        App Menu
      </Text>
      <Text size="p2" variant="muted">
        Custom navigation actions or drawer content can go here.
      </Text>
    </View>
  );
};
