import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  border?: boolean;
  /** Inject custom content (icon, etc.) instead of the default fallback chain */
  children?: React.ReactNode;
  fallbackBg?: string;
  fallbackTextColor?: string;
  initialsLength?: number;
}

const sizeMap = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-24 h-24',
};

const textSizeMap = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-sm font-semibold',
  lg: 'text-base font-bold',
  xl: 'text-lg font-bold',
  '2xl': 'text-2xl font-bold',
};

const iconSizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  className = '',
  border = false,
  children,
  fallbackBg = 'bg-primary/10',
  fallbackTextColor = 'text-primary',
  initialsLength = 2,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClass = sizeMap[size];
  const borderClass = border ? 'border-2 border-white' : '';

  // Only attempt image render if source is a non-empty string AND hasn't errored
  const hasValidSource =
    typeof source === 'string' && source.trim().length > 0 && !imgError;

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, initialsLength)
        .toUpperCase()
    : '';

  return (
    <View
      className={cn(
        sizeClass,
        'rounded-full overflow-hidden items-center justify-center bg-muted',
        borderClass,
        className
      )}
    >
      {children ? (
        // Custom content slot (e.g. icon injected by AvatarGroup)
        <View className="w-full h-full items-center justify-center">
          {children}
        </View>
      ) : hasValidSource ? (
        <Image
          source={{ uri: source }}
          className="w-full h-full"
          resizeMode="cover"
          onError={() => {
            // Silently fall through to initials / icon fallback
            setImgError(true);
          }}
        />
      ) : initials ? (
        <View className={cn('w-full h-full items-center justify-center', fallbackBg)}>
          <Text className={cn(textSizeMap[size], 'uppercase font-sans font-black', fallbackTextColor)}>
            {initials}
          </Text>
        </View>
      ) : (
        <View className="w-full h-full bg-muted items-center justify-center">
          <Ionicons
            name="person-outline"
            size={iconSizeMap[size]}
            color={colors.gray[600]}
          />
        </View>
      )}
    </View>
  );
};
