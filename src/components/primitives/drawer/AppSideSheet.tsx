import React, { useEffect, useRef, useState, memo } from 'react';
import {
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/core/hooks/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

interface AppSideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AppSideSheet = ({
  isOpen,
  onClose,
  children,
}: AppSideSheetProps) => {
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useTheme();

  // Handle visibility state locally to allow slide-out animation to complete
  const [visible, setVisible] = useState(isOpen);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setVisible(false);
        }
      });
    }
  }, [isOpen, animValue]);

  // Interpolations
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  const backdropOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <View style={styles.container}>
        {/* Backdrop overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacity,
                backgroundColor: '#000000',
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Slide-in side drawer content */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
              backgroundColor: isDark ? colors.dark[3] : colors.white,
              borderColor: isDark ? colors.dark[5] : colors.gray[200],
              paddingTop: Math.max(insets.top, 12),
              paddingBottom: Math.max(insets.bottom, 12),
            },
          ]}
        >
          <View style={styles.innerContent}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  drawer: {
    width: DRAWER_WIDTH,
    height: SCREEN_HEIGHT,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 16,
  },
  innerContent: {
    flex: 1,
  },
});

export default memo(AppSideSheet);
