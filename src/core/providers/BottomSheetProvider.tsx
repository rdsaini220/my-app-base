import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@/core/hooks/useTheme';
import { BottomSheetBlurBackdrop } from '@/components/primitives/bottom-sheet/BottomSheetBlurBackdrop';

interface BottomSheetContextType {
  showBottomSheet: (content: React.ReactNode, snapPoints?: string[] | number[]) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [snaps, setSnaps] = useState<string[] | number[]>(['50%']);
  const { isDark, colors } = useTheme();

  const showBottomSheet = (newContent: React.ReactNode, customSnapPoints?: string[] | number[]) => {
    setSnaps(customSnapPoints || ['50%']);
    setContent(newContent);
    bottomSheetRef.current?.present();
  };

  const hideBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBlurBackdrop {...props} />,
    []
  );

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
      {children}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snaps}
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
        <BottomSheetView className="flex-1 px-5 pb-8">
          {content}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) throw new Error('useBottomSheet must be used within BottomSheetProvider');
  return context;
};
