import React from 'react';
import { Tabs } from 'expo-router';
import MainTabs from '@/components/ui/organisms/MainTabs';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <MainTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
        }}
      />
    </Tabs>
  );
}
