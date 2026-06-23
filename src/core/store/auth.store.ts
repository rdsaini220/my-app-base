import { secureStorage } from '@/core/services/token.service';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { APP_CONSTANTS } from '@/core/constants/app.constants';

// Types
import { AuthResponse, User } from '@/features/auth/types';

// 1. Define Store Interface
interface AuthState {
    // Persistent Data (Jo Disk par save hoga)
    userToken: string | null;
    refreshToken: string | null;
    user: User | null;
    hasSeenOnboarding: boolean;

    // Session Data (Jo App restart hone par reset hona chahiye)
    isLoading: boolean; // API calls ke liye
    isHydrated: boolean; // Startup check ke liye ✅ NEW

    // Actions
    login: (data: AuthResponse) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    setIsLoading: (loading: boolean) => void;
    finishOnboarding: () => void;
    setHydrated: () => void;
    setUser: (user: User) => void;
    
    // Temporary Auth Data (For phone verification)
    tempAuthData: AuthResponse | null;
    setTempAuthData: (data: AuthResponse | null) => void;
}

// 2. Create Store
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial State
            userToken: null,
            refreshToken: null,
            user: null,
            hasSeenOnboarding: false,
            tempAuthData: null,

            isLoading: false, // Default false rakhein (API ke liye)
            isHydrated: false, // Default false (Startup ke liye)

            // Actions
            login: (data: AuthResponse) => {
                set({
                    userToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: data.user,
                    isLoading: false,
                    tempAuthData: null // Clear temp data on full login
                });
            },

            setTokens: (accessToken, refreshToken) => {
                set({
                    userToken: accessToken,
                    refreshToken: refreshToken
                });
            },

            logout: () => {
                set({
                    userToken: null,
                    refreshToken: null,
                    user: null,
                    isLoading: false,
                    tempAuthData: null
                });
            },

            setIsLoading: (loading) => {
                set({ isLoading: loading });
            },

            finishOnboarding: () => {
                set({ hasSeenOnboarding: true });
            },

            // ✅ Layout ko batane ke liye ki data load ho gaya
            setHydrated: () => {
                set({ isHydrated: true });
            },
            
            setUser: (user: User) => {
                set({ user });
            },

            setTempAuthData: (data) => {
                set({ tempAuthData: data });
            }
        }),
        {
            name: APP_CONSTANTS.STORAGE_KEYS.AUTH_STORAGE,
            storage: createJSONStorage(() => secureStorage),

            // ✅ CRITICAL: isLoading aur isHydrated ko kabhi save mat karna
            // Humne tempAuthData ko bhi save nahi kiya taaki session fresh rahe
            partialize: (state) => ({
                userToken: state.userToken,
                refreshToken: state.refreshToken,
                user: state.user,
                hasSeenOnboarding: state.hasSeenOnboarding,
            }),

            // ✅ Hydration Finish Logic
            onRehydrateStorage: () => (state) => {
                // Jab storage se data load ho jaye, tab flag true karo
                state?.setHydrated();
            }
        }
    )
);
