import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AppProvider } from '@/core/providers/AppProvider';
import { useAuthStore } from '@/core/store/auth.store';
import { initSentry, Sentry } from '@/core/sentry/sentry';
import '../global.css';

// Initialize Sentry immediately at application startup
initSentry();

function RootLayoutNav() {
  const segments = useSegments() as string[];
  const router = useRouter();
  const { userToken, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    // Skip runtime redirect on the root index route to let app/index.tsx handle the initial boot redirect.
    const isRootIndex = segments.length === 0 || segments[0] === 'index' || segments[0] === undefined;
    if (isRootIndex) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!userToken && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (userToken && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
  }, [userToken, segments, isHydrated, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="modal/search" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modal/filters" options={{ presentation: 'modal' }} />
      <Stack.Screen name="modal/member-select" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

function RootLayout() {
  return (
    <AppProvider>
      <RootLayoutNav />
    </AppProvider>
  );
}

export default Sentry.wrap(RootLayout);
