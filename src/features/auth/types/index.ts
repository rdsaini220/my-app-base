import { ImageResponse } from '@/types/common';

export type PaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'NET_BANKING' | string;

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    status: string;
    plan: string;
    currency: string;
    country_iso: string | null;
    avatar: ImageResponse | null;
    preferences: {
        theme: string;
        notification_enabled: boolean;
        language: string;
        timezone: string;
        payment_method: PaymentMethod;
    };
    is_email_verified: boolean;
    is_phone_verified: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
