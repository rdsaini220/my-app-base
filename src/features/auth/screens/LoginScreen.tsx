import React from 'react';
import { useRouter } from 'expo-router';
import { AuthLayout } from '../components/AuthLayout';
import { AuthTopBar } from '../components/AuthTopBar';
import { AuthHeader } from '../components/AuthHeader';
import { LoginForm } from '../components/LoginForm';

export const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      header={
        <AuthTopBar
          rightButtonText="Sign Up"
          onRightButtonPress={() => router.push('/register')}
        />
      }
    >
      {/* 1. Scrollable Header */}
      <AuthHeader
        title="Sign in"
        subtitle="Enter your details to proceed further"
      />

      {/* 2. Form Inputs & Actions */}
      <LoginForm />
    </AuthLayout>
  );
};
