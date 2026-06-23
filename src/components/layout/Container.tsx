import React from 'react';
import { View } from 'react-native';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={{ padding: 16 }}>{children}</View>
);
