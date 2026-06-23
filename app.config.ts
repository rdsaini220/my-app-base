import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const isSentryConfigured =
    process.env.EXPO_PUBLIC_SENTRY_DSN &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN;

  if (isSentryConfigured) {
    config.plugins = config.plugins || [];
    config.plugins.push([
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: process.env.SENTRY_PROJECT,
        organization: process.env.SENTRY_ORG || 'myappbase', // Make sure to use your Sentry org name or pass it in env
      },
    ]);
  } else {
    // Show a warning during build if variables are missing
    console.warn(
      '\n[Sentry] Missing EXPO_PUBLIC_SENTRY_DSN, SENTRY_PROJECT, or SENTRY_AUTH_TOKEN.\nSentry auto-upload plugin is disabled to prevent build errors.\n'
    );
  }

  return config as ExpoConfig;
};
