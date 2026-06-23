import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    // Listen to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isInternetReachable can be null initially, we consider false as definitely offline
      const connected = !!state.isConnected && state.isInternetReachable !== false;
      setIsConnected(connected);
    });

    return () => unsubscribe();
  }, []);

  return { isConnected };
};
