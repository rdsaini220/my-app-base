import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'muted';
  className?: string;
  labelClassName?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'info',
  className = '',
  labelClassName = '',
}) => {
  const variantStyles = {
    success: 'bg-success/15 border border-success/30',
    warning: 'bg-warning/15 border border-warning/30',
    error: 'bg-error/15 border border-error/30',
    info: 'bg-primary/15 border border-primary/30',
    muted: 'bg-muted border border-border',
  };

  const labelStyles = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-primary',
    muted: 'text-muted-foreground',
  };

  return (
    <View
      className={cn(
        'px-2.5 py-1 rounded-full self-start items-center justify-center',
        variantStyles[variant],
        className
      )}
    >
      <Text
        className={cn(
          'font-sans text-xs font-bold leading-none text-center',
          labelStyles[variant],
          labelClassName
        )}
      >
        {label}
      </Text>
    </View>
  );
};
