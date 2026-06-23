import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/atoms/Button';
import { Text } from '../ui/atoms/Text';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface OfflineStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  loading?: boolean;
}

export const OfflineState: React.FC<OfflineStateProps> = ({
  title = 'No Internet Connection',
  description = 'You are currently offline. Please check your network connection and try again.',
  onRetry,
  className = '',
  loading = false,
}) => {
  const { colors } = useTheme();

  return (
    <View
      className={cn(
        'bg-card/60 dark:bg-card/40 border border-dashed border-border/80 rounded-3xl p-8 items-center justify-center min-h-[260px] w-full shadow-sm',
        className
      )}
    >
      <View className="w-16 h-16 bg-amber-500/10 dark:bg-amber-500/5 rounded-2xl mb-4 items-center justify-center border border-amber-500/20">
        <Ionicons name="wifi-outline" size={32} color={colors.warning} />
      </View>

      <Text size="s1" className="font-extrabold text-foreground text-center mb-1.5">
        {title}
      </Text>

      <Text size="p2" variant="muted" className="text-center mb-6 max-w-[280px] leading-relaxed">
        {description}
      </Text>

      {onRetry && (
        <Button
          label="Check Connection"
          onPress={onRetry}
          variant="secondary"
          className="rounded-full w-full max-w-[200px] h-12 px-4 shadow-sm"
          loading={loading}
          icon={<Ionicons name="refresh" size={16} color="white" />}
        />
      )}
    </View>
  );
};
