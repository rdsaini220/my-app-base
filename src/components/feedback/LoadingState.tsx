import React from 'react';
import { View } from 'react-native';
import { Spinner } from '../ui/atoms/Spinner';
import { Text } from '../ui/atoms/Text';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

const Circle = ({ className = '' }: SkeletonProps) => (
  <View className={cn('w-12 h-12 rounded-full bg-muted animate-pulse', className)} />
);

const Line = ({ className = '' }: SkeletonProps) => (
  <View className={cn('h-4 rounded bg-muted animate-pulse w-full', className)} />
);

interface ListSkeletonProps {
  count?: number;
  hasAvatar?: boolean;
  hasSubtitle?: boolean;
}

const ListRow = ({ hasAvatar = true, hasSubtitle = true }: ListSkeletonProps) => (
  <View className="flex-row items-center py-3.5 px-4 w-full">
    {hasAvatar && <Circle className="mr-3" />}
    <View className="flex-1 justify-center">
      <Line className="h-4 bg-muted rounded w-2/3 mb-2" />
      {hasSubtitle && <Line className="h-3 bg-muted rounded w-1/3" />}
    </View>
  </View>
);

const ListItems = ({ count = 5, ...props }: ListSkeletonProps) => {
  return (
    <View className="w-full">
      {Array.from({ length: count }).map((_, i) => (
        <ListRow key={i} {...props} />
      ))}
    </View>
  );
};

export const AppSkeleton = {
  Circle,
  Line,
  ListRow,
  ListItems,
};

interface LoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'list';
  title?: string;
  count?: number;
  hasAvatar?: boolean;
  hasSubtitle?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  title = 'Loading...',
  count = 5,
  hasAvatar = true,
  hasSubtitle = true,
  className = '',
}) => {
  if (variant === 'skeleton' || variant === 'list') {
    return (
      <View className={cn('w-full py-4', className)}>
        <ListItems count={count} hasAvatar={hasAvatar} hasSubtitle={hasSubtitle} />
      </View>
    );
  }

  return (
    <View className={cn('flex-1 justify-center items-center p-6 min-h-[150px]', className)}>
      <Spinner size="large" className="mb-3" />
      {title ? (
        <Text size="p2" variant="muted" className="font-medium text-center">
          {title}
        </Text>
      ) : null}
    </View>
  );
};
