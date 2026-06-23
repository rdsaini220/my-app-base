import React from 'react';
import { ScreenContainer } from '@/components/ui/templates/ScreenContainer';
import { ScrollContainer } from '@/components/ui/templates/ScrollContainer';

// Components
import { Header } from '@/components/ui/organisms/Header';
import { Text } from '@/components/ui/atoms/Text';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <Header
        variant="dashboard"
        userName={'User'}
      />

      <ScrollContainer
        className='pt-5'
      >
        <Text>HomeScreen</Text>
      </ScrollContainer>
    </ScreenContainer>
  );
};
