import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getBottomTabBarHeight } from "@/core/constants/layout";

/**
 * Padding for scrollable content behind floating tab bar
 */
export const useTabPadding = () => {
    const insets = useSafeAreaInsets();

    return useMemo(() => {
        const paddingBottom = getBottomTabBarHeight(insets.bottom);

        return {
            paddingBottom,
            contentContainerStyle: {
                paddingBottom,
            },
        };
    }, [insets.bottom]);
};

/**
 * Safe bottom padding for fixed bottom actions/buttons
 */
export const useBottomSafePadding = (
    basePadding: number = 24
) => {
    const insets = useSafeAreaInsets();

    return useMemo(() => {
        return Math.max(insets.bottom + 8, basePadding);
    }, [basePadding, insets.bottom]);
};