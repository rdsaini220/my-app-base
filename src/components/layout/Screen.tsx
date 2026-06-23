import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: { flex: 1 }
});
