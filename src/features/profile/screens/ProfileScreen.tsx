import React from 'react';
import { View, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { ScreenContainer } from '@/components/ui/templates/ScreenContainer';
import { ScrollContainer } from '@/components/ui/templates/ScrollContainer';
import { Header } from '@/components/ui/organisms/Header';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileMenuSection } from '../components/ProfileMenu';
import { Button } from '@/components/ui/atoms/Button';

export const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const { handleLogout, isPending } = useLogout();

  const aboutItems = [
    {
      label: 'Help Center',
      icon: 'help-circle-outline' as const,
      onPress: () => { },
    },
    {
      label: 'About',
      icon: 'information-circle-outline' as const,
      onPress: () => Linking.openURL('https://google.com'),
    }
  ];

  return (
    <ScreenContainer>
      <Header
        variant="navigation"
        title="Profile"
        showBackButton={true}
      />

      <ScrollContainer showsVerticalScrollIndicator={false}>
        {/* 1. Profile Header */}
        <ProfileHeader />

        {/* 2. Menu Sections */}
        <View className="pb-4">
          <ProfileMenuSection title="Support & About" items={aboutItems} />
        </View>

        {/* 3. Logout Button */}
        <View className="px-4 pb-10">
          <Button
            variant="outline"
            label="Log Out"
            onPress={handleLogout}
            loading={isPending}
            disabled={isPending}
            icon={<Ionicons name="log-out-outline" size={20} color={themeColors.error} />}
            className="w-full border-error/40 active:bg-error/10"
            labelClassName="text-error"
          />
        </View>
      </ScrollContainer>
    </ScreenContainer>
  );
};
