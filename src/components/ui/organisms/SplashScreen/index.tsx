import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Image } from 'react-native';
import { Text } from '@/components/ui/atoms/Text';
import { useTheme } from '@/core/hooks/useTheme';
import { APP_CONSTANTS } from '@/core/constants/app.constants';


interface SplashScreenProps {
  /** Called when the splash animation has finished */
  onFinish: () => void;
  /** Duration in ms before onFinish fires (default 2600) */
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2600,
}) => {
  const { colors } = useTheme();

  // ── Logo animations ───────────────────────────────────────────────────────
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;

  // ── Dot animations ────────────────────────────────────────────────────────
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  // ── Text fade ─────────────────────────────────────────────────────────────
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    // 1. Logo pop-in
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        damping: 14,
        stiffness: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Glow pulse (loops)
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.1, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.3, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.3, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.0, duration: 900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ])
    );
    glowLoop.start();

    // 3. App name fade-up (delayed)
    Animated.sequence([
      Animated.delay(350),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 4. Dot wave (loops)
    const makeDotWave = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          Animated.delay(400),
        ])
      );
    makeDotWave(dot1, 0).start();
    makeDotWave(dot2, 200).start();
    makeDotWave(dot3, 400).start();

    // 5. Fire onFinish after `duration`
    const timer = setTimeout(() => {
      glowLoop.stop();
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-background">

      {/* ── Logo area ── */}
      <View style={styles.logoWrapper}>

        {/* Outer glow ring */}
        <Animated.View
          style={[
            styles.glow,
            {
              backgroundColor: colors.primary,
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        {/* Logo card */}
        <Animated.View
          className="w-48 h-48 rounded-lg bg-white items-center justify-center overflow-hidden"
          style={{
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 20,
            elevation: 16,
          }}
        >
          {/* Actual logo image */}
          <Image
            source={require('@/assets/app/splash-icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* ── App name + tagline ── */}
      <Animated.View
        className="items-center mt-8"
        style={{ opacity: textOpacity, transform: [{ translateY: textTranslateY }] }}
      >
        <Text variant="default" size="h2" className="font-bold tracking-tight">
          {APP_CONSTANTS.APP_NAME}
        </Text>
      </Animated.View>

      {/* ── Loading dots ── */}
      <View className="flex-row items-center mt-14 space-x-2">
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: colors.primary,
                opacity: dot,
                transform: [{
                  scale: dot.interpolate({ inputRange: [0.3, 1], outputRange: [0.8, 1.2] }),
                }],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    // blur is not native; we use large borderRadius + opacity pulse instead
  },
  logoImage: {
    width: 72,
    height: 72,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

SplashScreen.displayName = 'SplashScreen';
