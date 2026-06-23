import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export const linking: LinkingOptions<any> = {
  prefixes: [prefix, 'myappbase://'],
  config: {
    screens: {
      auth: {
        screens: {
          login: 'login',
          register: 'register',
        },
      },
      app: {
        screens: {
          dashboard: 'dashboard',
          profile: 'profile',
        },
      },
    },
  },
};
