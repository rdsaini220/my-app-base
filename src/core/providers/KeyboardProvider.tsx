import React from 'react';
import { KeyboardProvider as RNKeyboardProvider } from 'react-native-keyboard-controller';

export const KeyboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RNKeyboardProvider>{children}</RNKeyboardProvider>;
};
