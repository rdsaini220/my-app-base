import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
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
import { signupSchema, SignupFormValues } from '../schemas';

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const login = useAuthStore((state) => state.login);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

  const methods = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { trigger, getValues } = methods;

  const { mutate: signupMutate, isPending } = useAppMutation<AuthResponse, SignupFormValues>({
    endpoint: '/auth/register',
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

  const onSubmit = useCallback(async () => {
    const isValid = await trigger(['name', 'email', 'password']);
    if (isValid) {
      if (!agreeToPrivacy) {
        methods.setError('root', {
          type: 'manual',
          message: 'You must agree to the Privacy Policy & Terms of Service',
        });
        return;
      }
      signupMutate(getValues());
    }
  }, [trigger, agreeToPrivacy, signupMutate, getValues, methods]);

  return (
    <View className="flex-1 justify-between">
      <FormProvider {...methods}>
        <View className="space-y-4">
          <FormInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            leftIcon="person-outline"
          />

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
            placeholder="Enter password"
            secureTextEntry={true}
            leftIcon="lock-closed-outline"
          />

          {/* Privacy Policy Checkbox */}
          <TouchableOpacity
            onPress={() => {
              setAgreeToPrivacy(!agreeToPrivacy);
              methods.clearErrors('root');
            }}
            className="flex-row items-start space-x-2 pt-2 pr-4"
          >
            <Ionicons
              name={agreeToPrivacy ? 'checkbox' : 'square-outline'}
              size={20}
              color={agreeToPrivacy ? colors.primary : colors.gray[500]}
              style={{ marginTop: 2 }}
            />
            <View className="flex-1 ml-1.5">
              <Text variant="default" size="p2" className="text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <Text
                  variant="primary"
                  size="p2"
                  className="font-bold underline"
                  onPress={() => Linking.openURL('https://myappbase.com/privacy-policy')}
                >
                  Privacy Policy
                </Text>{' '}
                and{' '}
                <Text
                  variant="primary"
                  size="p2"
                  className="font-bold underline"
                  onPress={() => Linking.openURL('https://myappbase.com/terms-of-conditions')}
                >
                  Terms of Service
                </Text>
                .
              </Text>
            </View>
          </TouchableOpacity>
          {methods.formState.errors.root && (
            <Text variant="default" size="p2" className="text-red-500 mt-1 ml-8">
              {methods.formState.errors.root.message}
            </Text>
          )}
        </View>
      </FormProvider>

      {/* Action Button & Footer Options */}
      <View className="mt-8">
        <Button
          variant="primary"
          label="Register Now"
          onPress={onSubmit}
          loading={isPending}
          className="w-full mb-6"
        />

        <View className="mb-6">
          <AuthDivider />
        </View>

        <View className="mb-8">
          <AuthSocialButtons />
        </View>

        {/* Login Navigation Link */}
        <View className="flex-row justify-center">
          <Text variant="muted" size="p2">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text variant="primary" size="p2" className="font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
