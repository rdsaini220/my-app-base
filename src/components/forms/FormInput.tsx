import React from 'react';
import { View, Text } from 'react-native';
import { Control, Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '../ui/atoms/Input';
import { cn } from '@/utils/cn';

interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'value' | 'onChangeText'> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  className?: string;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  className = '',
  ...props
}: FormInputProps<T>) => {
  const methods = useFormContext();
  const activeControl = control || methods?.control;

  return (
    <Controller
      control={activeControl as any}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={cn('mb-5', className)}>
          {label && (
            <Text className="text-sm font-sans font-semibold text-foreground mb-2 ml-1">
              {label}
            </Text>
          )}

          <Input
            value={value === 0 ? '0' : (value ? String(value) : '')}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            {...props}
          />

          {error && (
            <Text className="text-xs font-sans text-error mt-1.5 ml-2 font-medium">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};
