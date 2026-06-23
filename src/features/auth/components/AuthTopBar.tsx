import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '@/components/ui/atoms/Text';
import LogoSVG from '@/assets/app/logo.svg';

interface AuthTopBarProps {
  rightButtonText?: string;
  onRightButtonPress?: () => void;
}

export const AuthTopBar: React.FC<AuthTopBarProps> = ({
  rightButtonText,
  onRightButtonPress
}) => {
  const { colors } = useTheme();

  return (
    <View className="w-full flex-row justify-between items-center bg-transparent pb-2">
      {/* Left side: Back Button or Logo */}
      <View className="w-12 h-12 bg-white rounded-xl border border-border items-center justify-center overflow-hidden">
        <LogoSVG width={26} height={26} fill={colors.primary} />
      </View>

      {/* Right side: Optional action link */}
      {rightButtonText && onRightButtonPress ? (
        <TouchableOpacity
          onPress={onRightButtonPress}
          activeOpacity={0.8}
          className="bg-card px-5 py-2.5 rounded-full border border-border active:opacity-75"
        >
          <Text variant="default" size="p2" className="font-bold text-foreground">
            {rightButtonText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
};
