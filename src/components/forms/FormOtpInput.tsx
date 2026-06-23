import React from 'react';
import { Control, Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { View, Text } from 'react-native';
import { OTPInput } from '../ui/molecules/OTPInput';
import { cn } from '@/utils/cn';

interface FormOtpInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  length?: number;
  className?: string;
}

export const FormOtpInput = <T extends FieldValues>({
  control,
  name,
  label,
  length = 4,
  className = '',
}: FormOtpInputProps<T>) => {
  const methods = useFormContext();
  const activeControl = control || methods?.control;

  return (
    <Controller
      control={activeControl as any}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className={cn('mb-5', className)}>
          {label && (
            <Text className="text-sm font-sans font-semibold text-foreground mb-3 ml-1">
              {label}
            </Text>
          )}

          <OTPInput
            length={length}
            value={value ? String(value) : ''}
            onChange={onChange}
            error={!!error}
          />

          {error && (
            <Text className="text-xs font-sans text-error mt-2 ml-2 font-medium">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};
