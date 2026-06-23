import React from 'react';
import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '@/components/ui/atoms/Text';
import { Button } from '@/components/ui/atoms/Button';
import { APP_CONSTANTS } from '@/core/constants/app.constants';

import { useOnboarding } from '../hooks/useOnboarding';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { PaginationDots } from '../components/PaginationDots';

// SVG Illustrations
import LogoSVG from '@/assets/app/logo.svg';
import Step1SVG from '@/assets/images/onboarding/step1.svg';
import Step2SVG from '@/assets/images/onboarding/step2.svg';
import Step3SVG from '@/assets/images/onboarding/step3.svg';

const SLIDES = [
    {
        id: '1',
        title: 'Manage Group\nExpenses Smarter',
        description: 'Effortlessly track spending, split bills instantly, and settle up with friends without the awkward conversations.',
        icon: Step1SVG,
    },
    {
        id: '2',
        title: 'Set Shared\nFinancial Goals',
        description: 'Collaborate with friends to reach savings targets faster. Track collective progress and celebrate milestones together.',
        icon: Step2SVG,
    },
    {
        id: '3',
        title: "Track Your Group's\nProgress",
        description: "Gain clear insights into spending habits. Manage balances and watch your group's financial health grow together.",
        icon: Step3SVG,
    },
];

export const OnboardingScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { isDark, colors } = useTheme();

    const {
        flatListRef,
        currentIndex,
        handleScroll,
        handleLogin,
        handleRegister,
        width,
    } = useOnboarding();

    // Dynamic light/dark gradients for background depth
    const gradientColors = isDark
        ? ['rgba(0, 175, 102, 0.05)', '#181A20', '#181A20']
        : ['rgba(0, 175, 102, 0.08)', '#FFFFFF', '#FFFFFF'];

    return (
        <View className="flex-1 bg-background">
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Decorative gradient overlay */}
            <LinearGradient
                colors={gradientColors as [string, string, ...string[]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                className="absolute inset-0"
            />

            <View
                className="flex-1"
                style={{
                    paddingTop: Math.max(insets.top, 16),
                    paddingBottom: Math.max(insets.bottom, 24),
                }}
            >
                {/* Top Header/Logo aligned to the left (no Skip button) */}
                <View className="pb-4 items-center flex-row justify-start space-x-2.5 px-6">
                    <View className="w-10 h-10 bg-white rounded-xl justify-center items-center overflow-hidden border border-primary/20">
                        <LogoSVG width={26} height={26} fill={colors.primary} />
                    </View>
                    <Text variant="default" size="s1" className="font-black tracking-wider ml-2.5">
                        {APP_CONSTANTS.APP_NAME}
                    </Text>
                </View>

                {/* Carousel Slider */}
                <View className="flex-1">
                    <FlatList
                        ref={flatListRef}
                        data={SLIDES}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        snapToInterval={width}
                        snapToAlignment="center"
                        disableIntervalMomentum
                        getItemLayout={(_, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                        initialNumToRender={1}
                        maxToRenderPerBatch={1}
                        windowSize={2}
                        removeClippedSubviews
                        renderItem={({ item }) => (
                            <OnboardingSlide
                                title={item.title}
                                description={item.description}
                                IconComponent={item.icon}
                            />
                        )}
                    />
                </View>

                {/* Footer controls (Pagination dots & Dual CTA action buttons) */}
                <View className="px-8 pb-6 pt-2 w-full">
                    {/* Pagination Dots */}
                    <View className="mb-8">
                        <PaginationDots slidesCount={SLIDES.length} currentIndex={currentIndex} />
                    </View>

                    {/* Primary Action Button: Get Started */}
                    <Button
                        variant="primary"
                        label="Get Started"
                        onPress={handleLogin}
                        className="w-full mb-4"
                    />

                    {/* Secondary Action Button: Create an Account */}
                    <Button
                        variant="outline"
                        label="Create an Account"
                        onPress={handleRegister}
                        className="w-full border-border bg-card"
                    />
                </View>
            </View>
        </View>
    );
};
