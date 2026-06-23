import React from 'react';
import { View, ScrollView } from 'react-native';
import { cn } from '@/utils/cn';

interface DashboardTemplateProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  useScrollView?: boolean;
  className?: string;
  contentContainerClassName?: string;
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  header,
  children,
  useScrollView = true,
  className = '',
  contentContainerClassName = '',
}) => {
  return (
    <View className={cn('flex-1 bg-background', className)}>
      {header}

      <View className="flex-1 overflow-hidden">
        {useScrollView ? (
          <ScrollView
            contentContainerClassName={cn('px-4 pt-4 pb-8', contentContainerClassName)}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View className={cn('flex-1 px-4 pt-4', contentContainerClassName)}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
};
