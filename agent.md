# 🤖 AI Agent Coding Guidelines (MyAppBase)

Welcome, AI Agent! If you are reading this, you have been tasked with modifying or extending the `MyAppBase` codebase. This file contains the architectural rules, styling patterns, and best practices you **must** strictly follow.

---

## 1. 🏗 Architecture & File Structure

This project follows a strict **Feature-Driven Architecture** combined with **Atomic Design** for global components.

- **`src/components/ui/`**: This is where all **GLOBAL, REUSABLE UI components** live. It follows Atomic Design:
  - `/atoms`: Basic building blocks (`Text.tsx`, `Button.tsx`, `Input.tsx`).
  - `/molecules`: Combinations of atoms (`FormField.tsx`).
  - `/organisms`: Complex sections (`MainTabs`, `SplashScreen`).
- **`src/features/`**: All business logic and screen layouts live here. Features are self-contained.
  - E.g., `src/features/auth/` contains its own `components`, `hooks`, `schemas`, `screens`, and `store`.
- **`src/core/`**: App-wide setups (API instances, global hooks, providers, constants).
- **`app/`**: Expo Router files. These should mostly just import and export screens from `src/features/`. **DO NOT put complex UI logic inside the `app/` directory.**

---

## 2. 🧩 Using Global Components

**CRITICAL RULE:** Do NOT create custom local UI components (like a custom button or text) inside a feature if a global one already exists in `src/components/ui/`.

- Always import global components using aliases:
  ```tsx
  import { Text } from '@/components/ui/atoms/Text';
  import { Button } from '@/components/ui/atoms/Button';
  ```
- **Text:** Do NOT use React Native's `<Text>`. Always use our custom `<Text>` atom which automatically handles typography and dark mode.
- **Button:** Always use the global `<Button>` atom which supports multiple variants (`primary`, `secondary`, `outline`, `ghost`).

---

## 3. 🌓 Dark Mode & Light Mode Implementation

This project uses **NativeWind v5** with CSS variables for seamless theming.

### How it works under the hood:
- The theme is managed by `ThemeContext` in `src/core/providers/ThemeProvider.tsx`.
- It defines CSS variables (e.g., `--color-background`, `--color-primary`) based on the active theme (light or dark).
- NativeWind's `VariableContextProvider` injects these into the React Native runtime.

### How YOU should style for Dark Mode:
1. **Use Tailwind Semantic Classes (Preferred):**
   You do NOT need to write `dark:bg-black bg-white`. Instead, use the semantic color classes that automatically switch based on the theme context:
   ```tsx
   // ✅ DO THIS:
   <View className="bg-background border-border">
     <Text className="text-foreground">Hello</Text>
     <Text className="text-muted-foreground">Subtitle</Text>
   </View>
   ```

2. **Programmatic Theming (When Tailwind isn't enough):**
   If you need to pass a color to a native prop (e.g., `placeholderTextColor` or a chart configuration), use the `useTheme` hook:
   ```tsx
   import { useTheme } from '@/core/hooks/useTheme';

   const { colors, isDark } = useTheme();

   // Usage:
   <TextInput placeholderTextColor={colors.gray[400]} />
   <BottomSheet backgroundStyle={{ backgroundColor: isDark ? colors.dark[2] : colors.white }}>
   ```

---

## 4. 💅 Styling Rules

1. **NO `StyleSheet.create`:** You must use NativeWind (Tailwind CSS) via the `className` prop for 99% of styling.
   - *Exception:* Complex dynamic Reanimated styles or highly specific native shadows where Tailwind struggles.
2. **NO Hardcoded Colors:** Never write `#FFFFFF` or `#000000`. Always use `bg-background`, `text-primary`, or `colors.gray[200]`.
3. **Margins & Padding:** Use standard Tailwind spacing (`p-4`, `m-2`, `gap-y-4`). Do not use arbitrary values unless absolutely necessary.

---

## 5. 📡 State & Data Fetching

- **Global UI State:** Use `Zustand` (`src/core/store/` or `src/features/*/store/`).
- **Server Data (APIs):** Use **TanStack Query** but ALWAYS use our custom wrapper **`useAppQuery`** instead of raw `useQuery`. Use **`useAppMutation`** for writes. Do not use raw `useEffect` + `fetch`/`axios` inside components.
  - Create custom hooks in `src/features/*/hooks/` (e.g., `useLoginMutation()`) and call the API functions defined in `src/features/*/api/`.

---

## 6. 🧹 TypeScript & Linting

- **NO `any` types.** Always define proper Interfaces or Types.
- When dealing with Expo Router paths, cast them properly or use `as any` **only** if the router type definitions are misbehaving, but prefer strict typing.
- Always run `npm run lint` conceptually before finalizing code.

---
**Agent, adhere to these guidelines strictly to ensure a clean, performant, and scalable React Native architecture.**
