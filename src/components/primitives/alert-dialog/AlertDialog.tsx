import React from 'react';
import { View } from 'react-native';
import { Button } from '../../ui/atoms/Button';
import { Text } from '../../ui/atoms/Text';
import { AppModal } from '../modal/AppModal';
import { cn } from '@/utils/cn';

interface AlertDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  variant?: 'danger' | 'primary';
  className?: string;
  loading?: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  onClose,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onConfirm,
  variant = 'primary',
  className = '',
  loading = false,
}) => {
  return (
    <AppModal visible={visible} onClose={onClose} title={title} className={className}>
      <View className="w-full">
        <Text size="p1" variant="muted" className="mb-6">
          {description}
        </Text>

        <View className="flex-row gap-x-3 w-full">
          <Button
            label={cancelLabel}
            onPress={onClose}
            variant="outline"
            className="flex-1 rounded-xl h-12 mr-3"
          />
          <Button
            label={confirmLabel}
            onPress={onConfirm}
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className="flex-1 rounded-xl h-12"
            loading={loading}
          />
        </View>
      </View>
    </AppModal>
  );
};
