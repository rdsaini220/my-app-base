import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

interface UpdateProviderProps {
  children: React.ReactNode;
}

export const UpdateProvider: React.FC<UpdateProviderProps> = ({ children }) => {
  const { isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (__DEV__) return;

    const checkUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
        }
      } catch (error) {
        console.warn("OTA update check failed:", error);
      }
    };

    checkUpdates();
  }, []);

  useEffect(() => {
    if (__DEV__) return;

    if (isUpdatePending) {
      Alert.alert(
        "New Update Available",
        "A new update has been downloaded. The app will restart to apply it.",
        [
          {
            text: "Restart Now",
            onPress: async () => {
              try {
                await Updates.reloadAsync();
              } catch (err) {
                console.error("Failed to reload app:", err);
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  }, [isUpdatePending]);

  return <>{children}</>;
};
