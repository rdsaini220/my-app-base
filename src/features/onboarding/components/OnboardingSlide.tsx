import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text } from '@/components/ui/atoms/Text';
import { SvgProps } from 'react-native-svg';

interface OnboardingSlideProps {
  title: string;
  description: string;
  IconComponent: React.FC<SvgProps>;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = React.memo(({
  title,
  description,
  IconComponent,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }} className="flex-1 justify-center items-center px-8">
      {/* Visual illustration wrapper with soft branding color background */}
      <View className="mb-10 w-64 h-64 justify-center items-center bg-primary/5 rounded-[40px] border border-primary/10 overflow-hidden relative">
        <View className="absolute inset-4 bg-primary/5 rounded-full blur-2xl" />
        <IconComponent width={220} height={220} />
      </View>

      {/* Animated title with font weights and line heights */}
      <Text
        variant="default"
        size="h2"
        className="font-black text-center mb-4 tracking-tight leading-tight px-2"
      >
        {title}
      </Text>

      {/* Supporting details text */}
      <Text
        variant="muted"
        size="p1"
        className="text-center leading-relaxed px-4 text-muted-foreground"
      >
        {description}
      </Text>
    </View>
  );
});

OnboardingSlide.displayName = 'OnboardingSlide';
