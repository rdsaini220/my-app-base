import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../components/AuthLayout';
import { AuthTopBar } from '../components/AuthTopBar';
import { AuthHeader } from '../components/AuthHeader';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [savedEmail, setSavedEmail] = useState<string>('');

  return (
    <AuthLayout
      header={
        <AuthTopBar
          rightButtonText="Login"
          onRightButtonPress={() => router.replace('/login')}
        />
      }
    >
      {/* 1. Header */}
      <AuthHeader
        title={step === 1 ? 'Forgot Password' : 'Reset Password'}
        subtitle={
          step === 1
            ? "Enter your registered email and we'll send you an OTP to reset your password."
            : `We've sent a 4-digit code to ${savedEmail}. Enter it below with your new password.`
        }
      />

      {/* 2. Form Component */}
      <ForgotPasswordForm
        step={step}
        setStep={setStep}
        savedEmail={savedEmail}
        setSavedEmail={setSavedEmail}
      />
    </AuthLayout>
  );
};
