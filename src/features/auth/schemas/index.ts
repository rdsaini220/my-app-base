import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type SignupFormValues = z.infer<typeof signupSchema>;

export const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be exactly 4 digits').regex(/^\d{4}$/, 'OTP must contain only numbers'),
});
export type OtpFormValues = z.infer<typeof otpSchema>;

export const requestOtpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});
export type RequestOtpFormValues = z.infer<typeof requestOtpSchema>;

export const resetPasswordSchema = z.object({
  otp_code: z.string().length(4, 'OTP must be exactly 4 digits').regex(/^\d{4}$/, 'OTP must contain only numbers'),
  new_password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
