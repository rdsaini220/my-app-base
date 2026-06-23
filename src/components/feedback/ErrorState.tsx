import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/atoms/Button';
import { Text } from '../ui/atoms/Text';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
  loading?: boolean;
  variant?: 'card' | 'full';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description = 'Something went wrong. Please check your connection and try again.',
  onRetry,
  className = '',
  loading = false,
  variant = 'full',
}) => {
  if (variant === 'card') {
    return (
      <View
        className={cn(
          'bg-card/60 dark:bg-card/40 border border-dashed border-rose-500/30 dark:border-rose-500/20 rounded-2xl p-5 justify-center items-center',
          className
        )}
      >
        <Text size="p2" variant="error" className="font-extrabold text-center">
          {title}
        </Text>
        {description ? (
          <Text size="l2" variant="muted" className="mt-1 text-center font-medium leading-normal">
            {description}
          </Text>
        ) : null}
        {onRetry && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRetry}
            disabled={loading}
            className="mt-3 px-4 py-1.5 bg-primary/10 rounded-full active:bg-primary/20 flex-row items-center justify-center border border-primary/20"
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} className="mr-1.5" />
            ) : null}
            <Text size="l2" variant="primary" className="font-bold">
              Retry
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View
      className={cn(
        'bg-rose-500/5 dark:bg-rose-950/5 border border-dashed border-rose-500/30 dark:border-rose-500/20 rounded-3xl p-8 items-center justify-center min-h-[260px] w-full shadow-sm',
        className
      )}
    >
      <View className="w-16 h-16 bg-rose-500/10 dark:bg-rose-500/5 rounded-2xl mb-4 items-center justify-center border border-rose-500/20">
        <Ionicons name="alert-circle-outline" size={32} color={colors.error} />
      </View>

      <Text size="s1" className="font-extrabold text-rose-600 dark:text-rose-400 text-center mb-1.5">
        {title}
      </Text>

      {description ? (
        <Text size="p2" className="text-rose-500/80 dark:text-rose-400/80 text-center mb-6 max-w-[280px] leading-relaxed">
          {description}
        </Text>
      ) : null}

      {onRetry && (
        <Button
          label="Retry Again"
          onPress={onRetry}
          variant="outline"
          className="border-rose-500/30 dark:border-rose-500/20 bg-card rounded-full w-full max-w-[200px] h-12 px-4 shadow-sm"
          labelClassName="text-rose-600 dark:text-rose-400"
          loading={loading}
          icon={<Ionicons name="refresh" size={16} color={colors.error} />}
        />
      )}
    </View>
  );
};
