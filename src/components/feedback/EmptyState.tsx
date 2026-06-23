import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/atoms/Button';
import { Text } from '../ui/atoms/Text';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'folder-open-outline',
  actionLabel,
  onAction,
  className = '',
  loading = false,
  disabled = false,
  buttonVariant = 'secondary',
}) => {
  const { colors } = useTheme();

  return (
    <View
      className={cn(
        'bg-card/60 dark:bg-card/40 border border-dashed border-border/80 rounded-3xl p-8 items-center justify-center min-h-[260px] w-full shadow-sm',
        className
      )}
    >
      <View className="w-16 h-16 bg-primary/10 dark:bg-primary/5 rounded-2xl mb-4 items-center justify-center border border-primary/20">
        <Ionicons name={icon as any} size={32} color={colors.primary} />
      </View>

      <Text size="s1" className="font-extrabold text-foreground text-center mb-1.5">
        {title}
      </Text>
      
      <Text size="p2" variant="muted" className="text-center mb-6 max-w-[280px] leading-relaxed">
        {description}
      </Text>

      {actionLabel && onAction && (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant={buttonVariant}
          className="rounded-full w-full max-w-[200px] h-12 px-4 shadow-sm"
          loading={loading}
          disabled={disabled}
        />
      )}
    </View>
  );
};
