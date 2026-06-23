import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import { SplashScreen } from '@/components/ui/organisms/SplashScreen';
import { useAuthStore } from '@/core/store/auth.store';

export default function Index() {
  const [ready, setReady] = useState(false);
  const { userToken, hasSeenOnboarding, isHydrated } = useAuthStore();

  if (!ready || !isHydrated) {
    return <SplashScreen onFinish={() => setReady(true)} />;
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!userToken) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
