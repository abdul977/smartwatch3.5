import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  currency: string;
}

interface UserPreferencesState extends UserPreferences {
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  notifications: true,
  currency: 'NGN',
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      updatePreferences: (preferences) =>
        set((state) => ({
          ...state,
          ...preferences,
        })),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: 'user-preferences',
    }
  )
);