import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  labelClassName?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  className = '',
  labelClassName = '',
  loading = false,
  disabled = false,
  icon,
}) => {
  const variantStyles = {
    primary: 'bg-primary active:opacity-90',
    secondary: 'bg-secondary active:opacity-90',
    outline: 'bg-transparent border-[1.5px] border-border active:bg-muted',
    ghost: 'bg-transparent active:bg-muted',
    danger: 'bg-error active:opacity-90 shadow-md',
  };

  const labelStyles = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    outline: 'text-foreground',
    ghost: 'text-muted-foreground',
    danger: 'text-white',
  };

  const getSpinnerColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return colors.gray[600];
    }
    return 'white';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        'rounded-3xl h-14 flex-row items-center justify-center px-6 transition-all',
        variantStyles[variant],
        (disabled || loading) && 'opacity-60',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} className="mr-2" />
      ) : (
        icon && <View className="mr-2">{icon}</View>
      )}
      <Text
        className={cn(
          'font-sans font-bold text-base text-center',
          labelStyles[variant],
          labelClassName
        )}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
