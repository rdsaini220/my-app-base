import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/atoms/Text';
import { useTheme } from '@/core/hooks/useTheme';

interface MenuItemProps {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  trailing?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  isLast?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, trailing, onPress, destructive, isLast }) => {
  const { colors } = useTheme();

  const content = (
    <View className={`p-4 flex-row justify-between items-center ${!isLast ? 'border-b border-border' : ''}`}>
      <View className="flex-row items-center flex-1 mr-3">
        <View className={`w-10 h-10 rounded-xl justify-center items-center mr-3 ${destructive ? 'bg-error/10' : 'bg-primary/10'}`}>
          <Ionicons name={icon} size={20} color={destructive ? colors.error : colors.primary} />
        </View>
        <Text variant="default" size="p1" className="font-bold text-foreground">
          {label}
        </Text>
      </View>
      <View className="flex-row items-center">
        {trailing}
        {!trailing && <Ionicons name="chevron-forward" size={18} color="#757575" />}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

interface ProfileMenuSectionProps {
  title?: string;
  items: MenuItemProps[];
}

export const ProfileMenuSection: React.FC<ProfileMenuSectionProps> = ({ title, items }) => (
  <View className="mb-6">
    {title && (
      <Text variant="muted" size="l2" className="font-bold mb-3 uppercase tracking-wider ml-1 text-xs">
        {title}
      </Text>
    )}
    <View className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      {items.map((item, index) => (
        <MenuItem
          key={item.label}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  </View>
);
