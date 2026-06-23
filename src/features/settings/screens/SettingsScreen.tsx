import React from 'react';
import { ScreenContainer } from '@/components/ui/templates/ScreenContainer';
import { ScrollContainer } from '@/components/ui/templates/ScrollContainer';

// Components
import { Header } from '@/components/ui/organisms/Header';
import { Text } from '@/components/ui/atoms/Text';

export const SettingsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header
        variant="navigation"
        title="Settings"
      />
      <ScrollContainer
        className='pt-10'
      >
        <Text className='text-center'>Settings Screen</Text>
      </ScrollContainer>
    </ScreenContainer>
  );
};
