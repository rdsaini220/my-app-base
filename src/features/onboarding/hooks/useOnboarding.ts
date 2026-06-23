import { useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/core/store/auth.store';
import { useSharedValue } from 'react-native-reanimated';

export const useOnboarding = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);
  const finishOnboarding = useAuthStore((state) => state.finishOnboarding);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = contentOffsetX;

    const index = Math.round(contentOffsetX / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleLogin = () => {
    finishOnboarding();
    router.replace('/login');
  };

  const handleRegister = () => {
    finishOnboarding();
    router.replace('/register');
  };

  return {
    flatListRef,
    currentIndex,
    scrollX,
    width,
    handleScroll,
    handleLogin,
    handleRegister,
  };
};
