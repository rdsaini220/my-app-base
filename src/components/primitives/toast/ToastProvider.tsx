import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '@/components/ui/atoms/Text';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning' | 'loading';
  text1?: string;
  text2?: string;
  onPressHide?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, text1, text2, onPressHide }) => {
  const { isDark } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={22} color="#12D18E" />;
      case 'error':
        return <Ionicons name="close-circle" size={22} color="#F75555" />;
      case 'warning':
        return <Ionicons name="warning" size={22} color="#FACC15" />;
      case 'info':
        return <Ionicons name="information-circle" size={22} color="#00AF66" />;
      case 'loading':
        return <ActivityIndicator size="small" color="#00AF66" />;
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        width: screenWidth * 0.9,
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.3 : 0.08,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressHide}
        className="flex-row items-center bg-card border border-border p-4 rounded-2xl"
      >
        {/* Left side: Icon */}
        <View className="mr-3">{getIcon()}</View>

        {/* Center: Texts */}
        <View className="flex-1">
          {text1 && (
            <Text variant="default" size="p2" className="font-semibold text-foreground leading-snug">
              {text1}
            </Text>
          )}
          {text2 && (
            <Text variant="default" size="l1" className="text-muted-foreground mt-0.5 leading-snug">
              {text2}
            </Text>
          )}
        </View>

        {/* Right side: Close button */}
        <TouchableOpacity
          onPress={onPressHide}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="ml-2"
        >
          <Ionicons name="close" size={18} className="text-muted-foreground" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const toastConfig = {
  success: ({ text1, text2, onPress }: BaseToastProps) => (
    <CustomToast type="success" text1={text1} text2={text2} onPressHide={onPress || (() => Toast.hide())} />
  ),
  error: ({ text1, text2, onPress }: BaseToastProps) => (
    <CustomToast type="error" text1={text1} text2={text2} onPressHide={onPress || (() => Toast.hide())} />
  ),
  info: ({ text1, text2, onPress }: BaseToastProps) => (
    <CustomToast type="info" text1={text1} text2={text2} onPressHide={onPress || (() => Toast.hide())} />
  ),
  warning: ({ text1, text2, onPress }: BaseToastProps) => (
    <CustomToast type="warning" text1={text1} text2={text2} onPressHide={onPress || (() => Toast.hide())} />
  ),
  loading: ({ text1, text2, onPress }: BaseToastProps) => (
    <CustomToast type="loading" text1={text1} text2={text2} onPressHide={onPress || (() => Toast.hide())} />
  ),
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {children}
      <Toast config={toastConfig} topOffset={insets.top + 10} />
    </>
  );
};
