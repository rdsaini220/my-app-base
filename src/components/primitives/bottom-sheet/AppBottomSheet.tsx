import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '../../ui/atoms/Text';
import { cn } from '@/utils/cn';
import { BottomSheetBlurBackdrop } from './BottomSheetBlurBackdrop';

interface AppBottomSheetProps {
  sheetRef: React.RefObject<BottomSheetModal | null> | React.RefObject<any>;
  snapPoints?: string[] | number[];
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  sheetRef,
  snapPoints,
  title,
  children,
  className = '',
  contentClassName = '',
}) => {
  const { isDark, colors } = useTheme();

  const resolvedSnapPoints = useMemo(() => snapPoints || ['50%'], [snapPoints]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBlurBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={resolvedSnapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: isDark ? colors.dark[3] : colors.white,
        borderRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: isDark ? colors.dark[5] : colors.gray[200],
        width: 48,
        height: 5,
        borderRadius: 2.5,
      }}
    >
      <BottomSheetView className={cn('flex-1 px-5 pb-8', className)}>
        {title && (
          <View className="items-center pb-3 border-b border-border">
            <Text size="s1" className="font-bold text-center text-foreground pb-1">
              {title}
            </Text>
          </View>
        )}
        <View className={cn('flex-1', contentClassName)}>
          {children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
