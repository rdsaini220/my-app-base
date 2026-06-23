import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

// Initialize navigation integration for Expo Router performance tracking
export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

/**
 * 🚀 Sentry Initialization
 * Registers Sentry for global exception logging and performance tracing.
 */
export const initSentry = () => {
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.warn('[Sentry] No DSN provided in EXPO_PUBLIC_SENTRY_DSN. Sentry is disabled.');
    return;
  }

  Sentry.init({
    dsn,
    debug: __DEV__,
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: __DEV__ ? 1.0 : 0.2, // 20% in production, 100% in development
    integrations: [navigationIntegration],
    enableNativeFramesTracking: !isRunningInExpoGo(),
  });

  console.log('[Sentry] Initialized successfully in', __DEV__ ? 'development' : 'production');
};

export { Sentry };
