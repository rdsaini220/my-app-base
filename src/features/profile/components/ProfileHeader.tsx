import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/atoms/Text';
import { Avatar } from '@/components/ui/atoms/Avatar';
import { useAuthStore } from '@/core/store/auth.store';

/**
 * Centered Profile Header Component styled similarly to user's layout.
 */
export const ProfileHeader = memo(() => {
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'No email provided';
  const userPhone = user?.phone || 'No phone verified';

  return (
    <View className="pt-5 mb-2">
      {/* Centered User Card */}
      <View className="bg-card border border-border rounded-2xl p-6 items-center mb-6 shadow-sm w-full">
        {/* AVATAR SECTION */}
        <View className="mb-4">
          <View className="rounded-full border-2 border-primary overflow-hidden">
            <Avatar
              source={user?.avatar?.url || undefined}
              name={userName}
              size="2xl"
            />
          </View>
        </View>

        {/* USER INFO */}
        <Text variant="default" size="s1" className="font-bold text-center">
          {userName}
        </Text>

        {/* Email Verification Row */}
        <View className="flex-row items-center mt-1.5 justify-center">
          <Text variant="muted" size="p2" className="mr-1.5">
            {userEmail}
          </Text>
        </View>

        {/* Phone Verification Row */}
        <View className="flex-row items-center mt-1 justify-center">
          <Text variant="muted" size="p2" className="mr-1.5">
            {userPhone}
          </Text>
        </View>
      </View>
    </View>
  );
});

ProfileHeader.displayName = 'ProfileHeader';
