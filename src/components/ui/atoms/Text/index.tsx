import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { cn } from '@/utils/cn';

interface TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'primary' | 'success' | 'error';
  size?: 'd1' | 'd2' | 'h1' | 'h2' | 'h3' | 'h4' | 's1' | 's2' | 'p1' | 'p2' | 'l1' | 'l2';
  className?: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'default',
  size = 'p1',
  className = '',
  numberOfLines,
  style,
  onPress,
}) => {
  const sizeStyles = {
    d1: 'text-[64px] leading-[70px]',
    d2: 'text-[48px] leading-[52px]',
    h1: 'text-[40px] leading-[46px]',
    h2: 'text-[32px] leading-[40px]',
    h3: 'text-[28px] leading-[36px]',
    h4: 'text-[24px] leading-[32px]',
    s1: 'text-[20px] leading-[28px]',
    s2: 'text-[18px] leading-[26px]',
    p1: 'text-[16px] leading-[24px]',
    p2: 'text-[14px] leading-[20px]',
    l1: 'text-[12px] leading-[18px]',
    l2: 'text-[10px] leading-[16px]',
  };

  const variantStyles = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    success: 'text-success',
    error: 'text-error',
  };

  return (
    <RNText
      numberOfLines={numberOfLines}
      onPress={onPress}
      className={cn('font-sans', sizeStyles[size], variantStyles[variant], className)}
      style={style}
    >
      {children}
    </RNText>
  );
};
