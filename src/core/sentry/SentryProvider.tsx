import React, { useEffect } from 'react';
import { useNavigationContainerRef } from 'expo-router';
import { navigationIntegration } from './sentry';

interface SentryProviderProps {
  children: React.ReactNode;
}

/**
 * 🛡️ Sentry Provider Component
 * Automatically hooks into Expo Router's navigation ref to log transitions and render timings.
 */
export const SentryProvider: React.FC<SentryProviderProps> = ({ children }) => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (navigationRef) {
      navigationIntegration.registerNavigationContainer(navigationRef);
      console.log('[Sentry] Registered navigation container integration');
    }
  }, [navigationRef]);

  return <>{children}</>;
};
