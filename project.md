# MyAppBase Project Architecture & Development Guidelines

This document outlines the architecture, tech stack, coding standards, UI feedback paradigms, and strict rules that every developer and AI assistant must follow when modifying or adding code to the MyAppBase codebase.

---

## 1. Directory Structure

The project follows a modular, feature-oriented structure inside `src/`. Reusable logic and UI elements are layered according to atomic design principles.

```
src/
├── components/           # Global reusable UI components
│   ├── feedback/         # UI status views (EmptyState, ErrorState, OfflineState)
│   ├── forms/            # Form controls (FormInput)
│   ├── primitives/       # Raw components (Toast, layout blocks)
│   └── ui/               # Atom-Molecule-Organism tokens (Text, Button, Header, ScreenContainer)
├── core/                 # Shared infrastructure and configuration
│   ├── constants/        # Query keys, color tokens, and static definitions
│   ├── hooks/            # Custom global hooks (useTheme, useTabPadding, useAppQuery)
│   ├── lib/              # Client configurations (Axios HTTP client)
│   ├── sentry/           # Sentry initialization and integration
│   └── store/            # Zustand global stores (auth.store)
├── features/             # Feature-based business modules
│   ├── auth/             # Authentication screens & components (Email/Password based)
│   └── onboarding/       # User welcome flows
└── types/                # Strict TypeScript declaration types
```

---

## 2. Tech Stack & Environment Rules

* **Navigation:** `expo-router` is used for file-based routing. All new screens must be added inside the `app/` directory following the established folder group conventions (e.g., `(auth)`, `(tabs)`).
* **Styling:** `nativewind` (Tailwind CSS v4) is used for all styling. **Rule:** Do not use `StyleSheet.create` unless absolutely necessary for complex animations or legacy third-party support. Use Tailwind utility classes via `className`.
* **State Management:** Use `zustand` for global state. Do not introduce Redux or React Context for simple global states.
* **API & Data Fetching:** Use `@tanstack/react-query` combined with `axios` (`useAppQuery` / `useAppMutation`). **Rule:** Never use standard `fetch` or `useEffect` for data fetching.
* **Forms & Validation:** `react-hook-form` and `zod` are mandatory for all forms.
* **Crash Reporting:** `Sentry` is used for tracking crashes. **Rule:** Build configurations related to Sentry must reside in `app.config.ts` to dynamically check for environment variables (`EXPO_PUBLIC_SENTRY_DSN`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`) to prevent build failures when secrets are missing. `app.json` should only contain static configurations.

---

## 3. Coding Standards & UI Best Practices

### A. Strict Type Safety (No `any` Keyword)
* **Rule:** Do not use the `any` type under any circumstance.
* If generic component library typings (e.g. `@shopify/flash-list`) clash with React 19 typings:
  * Extend the base component properties with a specific typing interface.
  * Cast the component using `as unknown as React.ComponentType<SafeProps<DataType>>` to enforce strict type checking on render parameters instead of resorting to `any`.
  ```typescript
  interface SafeFlashListProps<T> extends FlashListProps<T> {
    estimatedItemSize: number;
  }
  const SafeFlashList = FlashList as unknown as React.ComponentType<SafeFlashListProps<ListElement>>;
  ```
* Cast path navigation objects using `Href` from `expo-router` (e.g. `target as Href`) rather than `any`.

### B. Form Rules
* The application **does not use phone numbers** for authentication. Ensure all new auth logic relies strictly on Email and Password.
* Use `methods.setError('root', { message: '...' })` for form-wide submission errors or missing global validation (e.g., unchecked privacy policy) rather than creating separate error state variables.

---

## 4. UI Feedback & Network States Management

To maintain a clean and unified user experience, network connection and state management must follow these exact constraints:

| State View | Usage Rule |
| :--- | :--- |
| **`OfflineState`** | **ONLY allowed on the `HomeScreen`**. The home page acts as the main gateway; sub-screens should not have full-screen offline triggers. |
| **`ErrorState`** | Used on sub-screens (e.g., `ActivityScreen`, `FriendsScreen`, `GroupsScreen`) to display failures (including network timeout/offline errors) with a `onRetry` action. |
| **`EmptyState`** | Used inside lists when `data.length === 0` to guide users on their next steps. |
| **Skeletons** | Rendered only during initial loading (`isLoading && !isRefetching`). Avoid layout shifts. |

---

## 5. Performance Optimization Rules
* **Shopify FlashList:** Use `FlashList` (typed through `SafeFlashList`) for high performance, recycling list items, and low memory footprints. Always specify `estimatedItemSize` and `getItemType`.
* **Callback Memoization:** Wrap all callbacks passed to list components (`onPress`, `onEndReached`, `onRefresh`) in `useCallback` to prevent unnecessary child component re-renders.
* **Component Memoization:** Wrap heavy child items (like `ActivityCard`, `GroupCard`) and static wrappers (`SectionHeader`) in `React.memo`.
