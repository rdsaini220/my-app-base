import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTheme } from '@/core/hooks/useTheme';

// --- Types ---
interface TabConfig {
  name: string;
  icon?: React.FC<any> | any;
  iconActive?: keyof typeof Ionicons.glyphMap;
  iconInactive?: keyof typeof Ionicons.glyphMap;
  isSvg: boolean;
}

interface MainTabsProps extends BottomTabBarProps {
  onFabPress?: () => void;
}

interface TabIconProps {
  icon?: React.FC<any> | any;
  iconActive?: keyof typeof Ionicons.glyphMap;
  iconInactive?: keyof typeof Ionicons.glyphMap;
  isSvg: boolean;
  isFocused: boolean;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
}

// --- Configuration ---
const TABS_CONFIG: TabConfig[] = [
  { name: 'home', iconActive: 'home', iconInactive: 'home-outline', isSvg: false },
  { name: 'profile', iconActive: 'person', iconInactive: 'person-outline', isSvg: false },
  { name: 'settings', iconActive: 'settings', iconInactive: 'settings-outline', isSvg: false },
];

// --- Sub-Components ---
const TabIcon = React.memo(({ icon: Icon, iconActive, iconInactive, isSvg, isFocused, onPress, activeColor, inactiveColor }: TabIconProps) => {
  const color = isFocused ? activeColor : inactiveColor;

  const scale = useSharedValue(1);
  const dotScale = useSharedValue(0);
  const dotOpacity = useSharedValue(0);
  const dotY = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1.2 : 1, { damping: 15 });
    dotScale.value = withSpring(isFocused ? 1 : 0, { damping: 15 });
    dotOpacity.value = withSpring(isFocused ? 1 : 0, { damping: 15 });
    dotY.value = withSpring(isFocused ? 4 : 0, { damping: 15 });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: dotScale.value },
      { translateY: dotY.value },
    ],
    opacity: dotOpacity.value,
  }));

  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{ padding: 8, alignItems: 'center', justifyContent: 'center' }}
      accessibilityRole="button"
      accessibilityLabel="Tab button"
      accessibilityState={{ selected: isFocused }}
    >
      <Animated.View style={animatedIconStyle}>
        {isSvg ? (
          <Icon
            width={24}
            height={24}
            fill={color}
            stroke={color}
            color={color}
            style={{ color }}
          />
        ) : (
          <Ionicons
            name={isFocused ? iconActive : iconInactive}
            size={24}
            color={color}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
});

// --- Main Component ---
const MainTabs = ({ state, descriptors, navigation, onFabPress }: MainTabsProps) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const activeColor = colors.primary;
  const inactiveColor = isDark ? colors.gray[400] : colors.gray[600];

  const focusedRoute = state.routes[state.index];
  const { options } = descriptors[focusedRoute.key];

  const router = useRouter();

  // Check if the tab bar should be hidden (Type-safe way)
  const flattenedStyle = StyleSheet.flatten(options.tabBarStyle) as ViewStyle;
  if (flattenedStyle?.display === 'none') {
    return null;
  }

  const handleTabPress = useCallback(
    (routeName: string, routeKey: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate({ name: routeName, merge: true, params: undefined });
      }
    },
    [navigation]
  );

  const defaultFabPress = useCallback(() => {
    router.push('/transaction/add');
  }, [router]);

  return (
    <View
      // Force Metro Rebuild
      style={[
        styles.container,
        {
          bottom: 0,
          height: 72 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: isDark ? 'rgba(24, 26, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? colors.dark[5] : 'rgba(238, 238, 238, 0.15)',
        }
      ]}
    >
      <BlurView
        intensity={80}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 8 }}>
        {TABS_CONFIG.map((tab) => {
          const route = state.routes.find((r) => r.name === tab.name);
          if (!route) return null;

          const isFocused = state.routes[state.index].name === tab.name;

          return (
            <TabIcon
              key={tab.name}
              icon={tab.icon}
              iconActive={tab.iconActive}
              iconInactive={tab.iconInactive}
              isSvg={tab.isSvg}
              isFocused={isFocused}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() => handleTabPress(tab.name, route.key, isFocused)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 72,
    borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    // Premium Shadow pointing upwards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 15,
    borderTopWidth: 1,
  }
});

export default React.memo(MainTabs);
