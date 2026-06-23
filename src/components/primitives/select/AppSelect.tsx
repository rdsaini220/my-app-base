import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '../../ui/atoms/Text';
import { AppModal } from '../modal/AppModal';
import { cn } from '@/utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  options: (string | SelectOption)[];
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  placeholder = 'Select Option',
  options,
  value,
  onChange,
  error = false,
  className = '',
}) => {
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const normalizedOptions: SelectOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setShowModal(false);
  };

  return (
    <View className={cn('w-full', className)}>
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
        <View className="flex-row items-center flex-1 mr-2">
          <Ionicons name="list-outline" size={20} color={colors.gray[600]} />
          <Text
            className={cn(
              'font-sans text-base ml-3 flex-1',
              selectedOption ? 'text-foreground font-semibold' : 'text-muted-foreground'
            )}
            numberOfLines={1}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={18} color={colors.gray[600]} />
      </TouchableOpacity>

      <AppModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title={label || placeholder}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="max-h-[300px] w-full">
          <View className="pb-4 w-full">
            {normalizedOptions.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  activeOpacity={0.7}
                  onPress={() => handleSelect(opt.value)}
                  className={cn(
                    'p-4 bg-card border rounded-2xl mb-3 flex-row justify-between items-center transition-colors w-full',
                    isSelected ? 'border-primary' : 'border-border'
                  )}
                >
                  <Text
                    className={cn(
                      'font-sans text-base flex-1 mr-2',
                      isSelected ? 'text-primary font-bold' : 'text-foreground'
                    )}
                    numberOfLines={1}
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
      </AppModal>
    </View>
  );
};
