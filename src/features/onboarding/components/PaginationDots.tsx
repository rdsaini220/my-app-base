import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';

interface PaginationDotsProps {
  slidesCount: number;
  currentIndex: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  slidesCount,
  currentIndex,
}) => {
  return (
    <View className="flex-row justify-center items-center space-x-2.5">
      {Array.from({ length: slidesCount }).map((_, index) => {
        const isActive = currentIndex === index;
        return (
          <View
            key={index}
            className={cn(
              'h-2 rounded-full transition-all duration-300 will-change-variable',
              isActive ? 'w-6 bg-primary' : 'w-2 bg-muted'
            )}
          />
        );
      })}
    </View>
  );
};
