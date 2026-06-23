import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
);
