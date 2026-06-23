import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@/core/hooks/useTheme';
import { Text } from '@/components/ui/atoms/Text';
import { Button } from '@/components/ui/atoms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { useAppMutation } from '@/core/hooks/useAppQuery';
import { useAuthStore } from '@/core/store/auth.store';
import { AuthResponse } from '../types';
import { AuthDivider } from './AuthDivider';
import { AuthSocialButtons } from './AuthSocialButtons';
import { loginSchema, LoginFormValues } from '../schemas';

export const LoginForm = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const login = useAuthStore((state) => state.login);
  const [rememberMe, setRememberMe] = useState(false);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutate, isPending } = useAppMutation<AuthResponse, LoginFormValues>({
    endpoint: '/auth/login',
    method: 'POST',
    showErrorToast: true,
    mutationOptions: {
      onSuccess: (data) => {
        if (data?.accessToken) {
          login(data);
          router.replace('/(tabs)/home');
        }
      },
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data);
  };

  return (
    <View className="flex-1 justify-between">
      <FormProvider {...methods}>
        <View className="space-y-4">
          <FormInput
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
          />

          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
            leftIcon="lock-closed-outline"
          />

          {/* Remember Me & Forgot Password */}
          <View className="flex-row justify-between items-center pt-2 mb-6">
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center space-x-2"
            >
              <Ionicons
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={20}
                color={rememberMe ? colors.primary : colors.gray[500]}
              />
              <Text variant="default" size="p2" className="font-semibold text-muted-foreground ml-1.5">
                Remember me
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              className="py-1"
            >
              <Text variant="primary" size="p2" className="font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormProvider>

      {/* Actions & Bottom Options */}
      <View className="mt-8">
        <Button
          variant="primary"
          label="Sign In"
          onPress={methods.handleSubmit(onSubmit)}
          loading={isPending || methods.formState.isSubmitting}
          className="w-full mb-6"
        />

        <View className="mb-6">
          <AuthDivider />
        </View>

        <View className="mb-8">
          <AuthSocialButtons />
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center">
          <Text variant="muted" size="p2">
            {"Don't have an account? "}
          </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text variant="primary" size="p2" className="font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
