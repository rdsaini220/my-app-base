import Toast from 'react-native-toast-message';

export const toast = {
  success: (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  },
  error: (message: string) => {
    const msgLower = message?.toLowerCase() || '';
    if (
      msgLower.includes('network') ||
      msgLower.includes('connection') ||
      msgLower.includes('internet') ||
      msgLower.includes('offline')
    ) {
      return;
    }
    Toast.show({
      type: 'error',
      text1: message,
    });
  },
  info: (message: string) => {
    Toast.show({
      type: 'info',
      text1: message,
    });
  },
  warning: (message: string) => {
    Toast.show({
      type: 'warning',
      text1: message,
    });
  },
  loading: (message: string) => {
    Toast.show({
      type: 'loading',
      text1: message,
      autoHide: false,
    });
  },
  dismiss: (_id?: string | number) => {
    Toast.hide();
  },
};
