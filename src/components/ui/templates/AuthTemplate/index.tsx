import React from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { cn } from '@/utils/cn';

interface AuthTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  className = '',
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={cn('flex-1 justify-center p-6', className)}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
