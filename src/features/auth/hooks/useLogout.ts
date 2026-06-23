import { useAppMutation } from '@/core/hooks/useAppQuery';
import { useAuthStore } from '@/core/store/auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useLogout = () => {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const { mutate: logoutApi, isPending } = useAppMutation<unknown, void>({
    endpoint: '/auth/logout',
    method: 'POST',
    mutationOptions: {
      onSettled: async () => {
        // Hamesha clear karein chahe API success ho ya fail
        logoutStore();

        // Clear all React Query cache
        queryClient.clear();

        // Clear local storage completely
        try {
          await AsyncStorage.clear();
        } catch (e) {
          console.error('Error clearing AsyncStorage', e);
        }

        router.replace('/(auth)/login');
      },
    },
    showErrorToast: false,
  });

  const handleLogout = () => {
    logoutApi();
  };

  return {
    handleLogout,
    isPending,
  };
};
