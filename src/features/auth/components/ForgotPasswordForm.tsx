import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@/components/ui/atoms/Text';
import { Button } from '@/components/ui/atoms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { FormOtpInput } from '@/components/forms/FormOtpInput';
import { useAppMutation } from '@/core/hooks/useAppQuery';
import { requestOtpSchema, RequestOtpFormValues, resetPasswordSchema, ResetPasswordFormValues } from '../schemas';

interface ForgotPasswordFormProps {
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  savedEmail: string;
  setSavedEmail: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  step,
  setStep,
  savedEmail,
  setSavedEmail,
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(0);

  // Resend OTP Cooldown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const requestMethods = useForm<RequestOtpFormValues>({
    resolver: zodResolver(requestOtpSchema),
    defaultValues: { email: '' },
  });

  const resetMethods = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp_code: '',
      new_password: '',
      confirm_password: '',
    },
  });

  // Request OTP Mutation
  const { mutate: requestOtp, isPending: isRequesting } = useAppMutation<any, RequestOtpFormValues>({
    endpoint: '/auth/forgot-password/request-otp',
    method: 'POST',
    showErrorToast: true,
    showSuccessToast: true,
    mutationOptions: {
      onSuccess: (_, variables) => {
        setSavedEmail(variables.email);
        setStep(2);
        setTimer(60);
      },
    },
  });

  // Reset Password Mutation
  const { mutate: resetPassword, isPending: isResetting } = useAppMutation<
    any,
    { email: string; otp_code: string; new_password: string }
  >({
    endpoint: '/auth/forgot-password/reset',
    method: 'POST',
    showErrorToast: true,
    showSuccessToast: true,
    mutationOptions: {
      onSuccess: () => {
        router.replace('/(auth)/login');
      },
    },
  });

  const onRequestOtpSubmit = (data: RequestOtpFormValues) => {
    requestOtp(data);
  };

  const onResetPasswordSubmit = (data: ResetPasswordFormValues) => {
    resetPassword({
      email: savedEmail,
      otp_code: data.otp_code,
      new_password: data.new_password,
    });
  };

  const handleResendOtp = () => {
    if (timer === 0 && savedEmail) {
      requestOtp({ email: savedEmail });
      setTimer(60);
    }
  };

  return (
    <View className="flex-1 justify-between text-foreground">
      {step === 1 ? (
        <FormProvider {...requestMethods}>
          <View className="space-y-4">
            <FormInput
              name="email"
              label="Email Address"
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
            />
          </View>
        </FormProvider>
      ) : (
        <FormProvider {...resetMethods}>
          <View className="space-y-4">
            <View>
              <FormOtpInput
                name="otp_code"
                label="Verification Code"
                length={4}
              />

              {/* Resend Link */}
              <View className="items-end mt-1 mb-2">
                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={timer > 0 || isRequesting}
                >
                  <Text
                    variant={timer > 0 ? 'muted' : 'primary'}
                    size="p2"
                    className="font-bold"
                  >
                    {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <FormInput
              name="new_password"
              label="New Password"
              placeholder="Enter new password"
              secureTextEntry={true}
              leftIcon="lock-closed-outline"
            />

            <FormInput
              name="confirm_password"
              label="Confirm New Password"
              placeholder="Confirm new password"
              secureTextEntry={true}
              leftIcon="lock-closed-outline"
            />
          </View>
        </FormProvider>
      )}

      {/* Action Button */}
      <View className="mt-8">
        {step === 1 ? (
          <Button
            variant="primary"
            label="Send OTP"
            onPress={requestMethods.handleSubmit(onRequestOtpSubmit)}
            loading={isRequesting}
            className="w-full mb-6"
          />
        ) : (
          <Button
            variant="primary"
            label="Reset Password"
            onPress={resetMethods.handleSubmit(onResetPasswordSubmit)}
            loading={isResetting || isRequesting}
            className="w-full mb-6"
          />
        )}

        {/* Back to Login Link */}
        <View className="flex-row justify-center">
          <Text variant="muted" size="p2">
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text variant="primary" size="p2" className="font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
