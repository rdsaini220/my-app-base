import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  options: (string | SelectOption)[];
  className?: string;
}

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select Option',
  options,
  className = '',
}: FormSelectProps<T>) => {
  const { colors, isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt };
    }
    return opt;
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = normalizedOptions.find((opt) => opt.value === value);

        const handleOptionSelect = (optionValue: string) => {
          onChange(optionValue);
          setShowModal(false);
        };

        return (
          <View className={cn('mb-5', className)}>
            {label && (
              <Text className="text-sm font-sans font-semibold text-foreground mb-2 ml-1">
                {label}
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowModal(true)}
              className={cn(
                'flex-row items-center justify-between bg-card border rounded-2xl px-4 h-16',
                error ? 'border-error' : 'border-border'
              )}
            >
              <View className="flex-row items-center">
                <Ionicons name="list-outline" size={20} color={colors.gray[600]} />
                <Text
                  className={cn(
                    'font-sans text-base ml-3',
                    selectedOption ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color={colors.gray[600]} />
            </TouchableOpacity>

            {error && (
              <Text className="text-xs font-sans text-error mt-1.5 ml-2 font-medium">
                {error.message}
              </Text>
            )}

            <Modal
              visible={showModal}
              transparent
              animationType="slide"
              onRequestClose={() => setShowModal(false)}
            >
              <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-card border-t border-border rounded-t-3xl max-h-[70%] p-6">
                  <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-lg font-sans font-bold text-foreground">
                      {label || 'Select Option'}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => setShowModal(false)}
                      className="w-9 h-9 rounded-full bg-muted justify-center items-center"
                    >
                      <Ionicons name="close" size={20} color={isDark ? "white" : "black"} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
                    <View className="space-y-3 pb-8">
                      {normalizedOptions.map((opt) => {
                        const isSelected = value === opt.value;
                        return (
                          <TouchableOpacity
                            key={opt.value}
                            onPress={() => handleOptionSelect(opt.value)}
                            className={cn(
                              'p-4 bg-card border rounded-2xl mb-3 flex-row justify-between items-center',
                              isSelected ? 'border-primary' : 'border-border'
                            )}
                          >
                            <Text
                              className={cn(
                                'font-sans text-base',
                                isSelected ? 'text-primary font-bold' : 'text-foreground'
                              )}
                            >
                              {opt.label}
                            </Text>

                            {isSelected && (
                              <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};
