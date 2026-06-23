import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from '@/components/primitives/toast/ToastProvider';
import { UpdateProvider } from './UpdateProvider';
import { SentryProvider } from '../sentry/SentryProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider>
            <KeyboardProvider>
              <ToastProvider>
                <BottomSheetModalProvider>
                  <UpdateProvider>
                    <SentryProvider>
                      {children}
                    </SentryProvider>
                  </UpdateProvider>
                </BottomSheetModalProvider>
              </ToastProvider>
            </KeyboardProvider>
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
