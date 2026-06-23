import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <View
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-px w-full my-3' : 'w-px h-full mx-3',
        className
      )}
    />
  );
};
