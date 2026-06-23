import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../atoms/Avatar';
import { Text } from '../../atoms/Text';
import { cn } from '@/utils/cn';

interface UserTileProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
  isSelected?: boolean;
  onPress?: () => void;
  rightAccessory?: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export const UserTile: React.FC<UserTileProps> = React.memo(({
  name,
  email,
  avatarUrl,
  isSelected = false,
  onPress,
  rightAccessory,
  isDisabled = false,
  className = '',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      disabled={isDisabled || !onPress}
      className={cn(
        'py-3.5 px-4 flex-row items-center border-b border-border bg-card transition-colors',
        isDisabled && 'opacity-50',
        className
      )}
    >
      <View className="flex-row flex-1 items-center">
        <Avatar
          source={avatarUrl || undefined}
          name={name}
          size="md"
          className="mr-3"
        />
        
        <View className="flex-1 justify-center">
          <Text size="p1" className="font-bold text-foreground" numberOfLines={1}>
            {name}
          </Text>
          <Text size="l1" variant="muted" className="mt-0.5" numberOfLines={1}>
            {email}
          </Text>
        </View>
      </View>

      <View className="pl-4 justify-center items-center">
        {rightAccessory ? (
          rightAccessory
        ) : onPress ? (
          <View
            className={cn(
              'w-6 h-6 rounded-full border items-center justify-center transition-colors',
              isSelected
                ? 'bg-primary border-primary'
                : 'border-border bg-card'
            )}
          >
            {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
});

UserTile.displayName = 'UserTile';
