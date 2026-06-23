import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/atoms/Text';
import { cn } from '@/utils/cn';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <View className={cn('w-full space-y-2 mt-4 mb-6', className)}>
      <Text variant="default" size="h2" className="font-bold tracking-tight">
        {title}
      </Text>
      <Text variant="muted" size="p1" className="leading-relaxed">
        {subtitle}
      </Text>
    </View>
  );
};
