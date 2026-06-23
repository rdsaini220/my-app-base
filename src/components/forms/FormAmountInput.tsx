import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { colors } from '@/core/theme/colors';
import { cn } from '@/utils/cn';

interface FormAmountInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const FormAmountInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = '0.00',
  className = '',
}: FormAmountInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={cn('mb-6', className)}>
          {label && (
            <Text className="text-sm font-sans font-semibold text-foreground mb-2 ml-1 text-center">
              {label}
            </Text>
          )}

          <View
            className={cn(
              'bg-card border rounded-2xl p-6 items-center shadow-sm',
              error
                ? 'border-error'
                : isFocused
                ? 'border-primary'
                : 'border-border'
            )}
          >
            <Text className="text-muted-foreground font-sans text-xs font-medium mb-1">
              Enter Amount
            </Text>
            
            <View className="flex-row items-center justify-center">
              <Text className="text-foreground font-sans text-4xl font-bold mr-2">
                ₹
              </Text>
              
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.gray[500]}
                keyboardType="numeric"
                value={value === 0 ? '' : (value ? String(value) : '')}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                className="text-foreground font-sans text-4xl font-bold min-w-[140px] h-14"
                style={{ textAlign: 'center' }}
              />
            </View>
          </View>

          {error && (
            <Text className="text-xs font-sans text-error mt-1.5 text-center font-medium">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};
