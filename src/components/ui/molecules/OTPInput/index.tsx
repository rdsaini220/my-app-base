import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { cn } from '@/utils/cn';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value,
  onChange,
  className = '',
  error = false,
}) => {
  const inputs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const otpArray = value ? value.split('') : Array(length).fill('');

  const handleChange = (text: string, index: number) => {
    const newOtpArray = [...otpArray];
    newOtpArray[index] = text.slice(-1);
    const newOtp = newOtpArray.join('');
    onChange(newOtp);

    // Focus next box
    if (text.length > 0 && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View className={cn('flex-row justify-between w-full px-1', className)}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <View
            key={index}
            className={cn(
              'w-16 h-16 rounded-2xl border-2 items-center justify-center bg-card transition-all',
              error
                ? 'border-error'
                : focusedIndex === index
                ? 'border-primary'
                : 'border-border'
            )}
          >
            <TextInput
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              className="text-2xl font-sans font-bold text-foreground w-full h-full"
              style={{ textAlign: 'center' }}
              keyboardType="number-pad"
              maxLength={1}
              value={otpArray[index] || ''}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          </View>
        ))}
    </View>
  );
};
