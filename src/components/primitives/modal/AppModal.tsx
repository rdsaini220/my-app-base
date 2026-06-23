import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '../../ui/atoms/Text';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  children,
  className = '',
  contentClassName = '',
}) => {
  const { isDark } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center px-4">
        {/* iOS style Blur Backdrop */}
        <BlurView
          intensity={50}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        {/* Soft dimming overlay that handles backdrop dismissal */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={StyleSheet.absoluteFill}
          className={isDark ? 'bg-black/75' : 'bg-black/65'}
        />

        <TouchableWithoutFeedback>
          <View
            className={cn(
              'bg-card border border-border rounded-2xl w-full p-6 shadow-2xl relative',
              className
            )}
          >
            {/* Header Area */}
            <View className="flex-row justify-between items-center mb-4 w-full">
              <Text size="h4" className="font-bold text-foreground">
                {title || 'Modal'}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-muted justify-center items-center active:opacity-75"
              >
                <Ionicons name="close" size={18} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>

            {/* Inner Content */}
            <View className={cn('w-full', contentClassName)}>
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};
