import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '@/components/ui/atoms/Text';
import { Avatar } from '@/components/ui/atoms/Avatar';
import { cn } from '@/utils/cn';

interface HeaderProps {
  variant?: 'navigation' | 'dashboard';

  // Navigation Variant Props
  title?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightActions?: React.ReactNode;

  // Dashboard Variant Props
  userName?: string;
  profileImage?: string;
  onProfilePress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  unreadNotifications?: boolean;

  // Common Styling
  className?: string;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  variant = 'navigation',
  title = '',
  onBackPress,
  showBackButton = true,
  rightActions,
  userName = 'User',
  profileImage,
  onProfilePress,
  onSearchPress,
  onNotificationPress,
  unreadNotifications = false,
  className = '',
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      router.push('/modal/search');
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push('/(tabs)/activity');
    }
  };

  return (
    <View
      style={{ paddingTop: Math.max(insets.top, 12) }}
      className={cn(
        'bg-card border-b border-border w-full will-change-variable',
        className
      )}
    >
      {variant === 'dashboard' ? (
        /* Dashboard Greeting Layout */
        <View className="px-5 pb-4 flex-row justify-between items-center w-full">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleProfilePress}
            className="flex-row items-center flex-1 mr-4"
          >
            <View className="rounded-full border-2 border-primary mr-3">
              <Avatar
                source={profileImage}
                name={userName}
                size="lg"
              />
            </View>
            <View className="flex-1 justify-center">
              <Text size='l2' variant="muted" className="tracking-wide">
                Welcome back
              </Text>
              <Text size='s2' className="font-bold text-foreground" numberOfLines={1}>
                {userName}
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center space-x-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSearchPress}
              className="w-11 h-11 rounded-full bg-card border border-border justify-center items-center active:bg-muted"
            >
              <Ionicons name="search-outline" size={20} color={isDark ? colors.white : colors.black} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleNotificationPress}
              className="w-11 h-11 rounded-full bg-card border border-border justify-center items-center ml-2 relative active:bg-muted"
            >
              <Ionicons name="notifications-outline" size={20} color={isDark ? colors.white : colors.black} />
              {unreadNotifications && (
                <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-card" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* Standard Navigation Header Layout */
        <View className="px-4 pb-3 flex-row justify-between items-center w-full">
          <View className="flex-row items-center flex-1">
            {showBackButton && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleBack}
                className="w-10 h-10 items-center justify-center rounded-xl bg-muted mr-3 active:bg-muted/80"
              >
                <Ionicons name="chevron-back" size={20} color={colors.gray[600]} />
              </TouchableOpacity>
            )}

            <Text size='s1' className="font-bold text-foreground flex-1" numberOfLines={1}>
              {title}
            </Text>
          </View>

          {rightActions && (
            <View className="flex-row items-center ml-3">
              {rightActions}
            </View>
          )}
        </View>
      )}
    </View>
  );
});

Header.displayName = 'Header';
