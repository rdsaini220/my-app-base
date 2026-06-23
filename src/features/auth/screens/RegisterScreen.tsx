import React from 'react';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../components/AuthLayout';
import { AuthTopBar } from '../components/AuthTopBar';
import { AuthHeader } from '../components/AuthHeader';
import { SignupForm } from '../components/SignupForm';

export const RegisterScreen: React.FC = () => {
  const router = useRouter();

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
        title="Create Account"
        subtitle="Start managing and splitting expenses smartly with friends today."
      />

      {/* 2. Signup Form Component */}
      <SignupForm />
    </AuthLayout>
  );
};
