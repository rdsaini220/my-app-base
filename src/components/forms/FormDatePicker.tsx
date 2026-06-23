import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/hooks/useTheme';
import { cn } from '@/utils/cn';

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select Date',
  className = '',
}: FormDatePickerProps<T>) => {
  const { colors, isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedDate = value ? new Date(value) : null;

        const handleDateSelect = (day: number) => {
          const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          onChange(newDate.toISOString());
          setShowModal(false);
        };

        const renderDays = () => {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();
          const daysInMonth = getDaysInMonth(year, month);
          const firstDay = getFirstDayOfMonth(year, month);
          
          const gridItems = [];
          for (let i = 0; i < firstDay; i++) {
            gridItems.push(<View key={`empty-${i}`} className="w-[12%] aspect-square m-1" />);
          }

          for (let day = 1; day <= daysInMonth; day++) {
            const isToday = 
              new Date().getDate() === day && 
              new Date().getMonth() === month && 
              new Date().getFullYear() === year;

            const isSelected = 
              selectedDate && 
              selectedDate.getDate() === day && 
              selectedDate.getMonth() === month && 
              selectedDate.getFullYear() === year;

            gridItems.push(
              <TouchableOpacity
                key={`day-${day}`}
                onPress={() => handleDateSelect(day)}
                className={cn(
                  'w-[12%] aspect-square m-1 rounded-full items-center justify-center',
                  isSelected 
                    ? 'bg-primary' 
                    : isToday 
                    ? 'bg-primary/20 border border-primary' 
                    : 'bg-transparent'
                )}
              >
                <Text 
                  className={cn(
                    'font-sans text-sm font-semibold',
                    isSelected 
                      ? 'text-white' 
                      : 'text-foreground'
                  )}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <View className="flex-row flex-wrap justify-start py-2">
              {gridItems}
            </View>
          );
        };

        const nextMonth = () => {
          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        };

        const prevMonth = () => {
          setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
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
              onPress={() => {
                if (selectedDate) setCurrentDate(selectedDate);
                setShowModal(true);
              }}
              className={cn(
                'flex-row items-center justify-between bg-card border rounded-2xl px-4 h-16',
                error ? 'border-error' : 'border-border'
              )}
            >
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color={colors.gray[600]} />
                <Text className={cn(
                  'font-sans text-base ml-3',
                  selectedDate ? 'text-foreground font-semibold' : 'text-muted-foreground'
                )}>
                  {selectedDate ? formatDate(selectedDate) : placeholder}
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
              animationType="fade"
              onRequestClose={() => setShowModal(false)}
            >
              <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-card border border-border rounded-3xl w-full p-6 shadow-2xl">
                  <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-lg font-sans font-bold text-foreground">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Text>

                    <View className="flex-row space-x-2">
                      <TouchableOpacity 
                        onPress={prevMonth}
                        className="w-9 h-9 rounded-full bg-muted justify-center items-center"
                      >
                        <Ionicons name="chevron-back" size={20} color={isDark ? "white" : "black"} />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={nextMonth}
                        className="w-9 h-9 rounded-full bg-muted justify-center items-center ml-2"
                      >
                        <Ionicons name="chevron-forward" size={20} color={isDark ? "white" : "black"} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="flex-row justify-between border-b border-border pb-2 px-1">
                    {daysOfWeek.map((day) => (
                      <Text key={day} className="text-center font-sans text-xs font-bold text-muted-foreground w-[12%]">
                        {day}
                      </Text>
                    ))}
                  </View>

                  {renderDays()}

                  <TouchableOpacity
                    onPress={() => setShowModal(false)}
                    className="mt-4 py-3.5 rounded-xl border border-border bg-muted justify-center items-center"
                  >
                    <Text className="text-foreground font-sans font-semibold">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};
