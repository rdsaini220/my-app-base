# MyAppBase - React Native Expo Production Boilerplate

A highly scalable, production-ready React Native boilerplate built on top of Expo and Expo Router. This boilerplate is designed for large-scale applications with a focus on performance, developer experience, and maintainability.

## 🚀 Tech Stack

- **Framework:** [Expo (SDK 54)](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling:** [NativeWind v5](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Global State:** [Zustand](https://github.com/pmndrs/zustand)
- **Server State / Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Local Storage:** [React Native MMKV](https://github.com/mrousavy/react-native-mmkv) (Extremely fast, synchronous key-value storage)
- **Error Tracking & Monitoring:** [Sentry](https://sentry.io/)
- **Network Detection:** `@react-native-community/netinfo`
- **Performance UI:** `@shopify/flash-list`, `@gorhom/bottom-sheet`, `react-native-reanimated`

## 📂 Project Structure

This project follows a **Feature-Driven Architecture**, making it highly scalable and easy to maintain.

```
MyAppBase/
├── app/                      # Expo Router file-based navigation (Routes)
├── src/
│   ├── assets/               # Images, SVGs, Fonts
│   ├── components/           # Reusable global UI components (Atomic Design: atoms, molecules, organisms)
│   ├── core/                 # App-wide configurations (api, hooks, i18n, navigation, sentry, store)
│   └── features/             # Feature modules (auth, onboarding, etc.)
│       └── [feature-name]/
│           ├── components/   # UI specific to this feature
│           ├── hooks/        # Custom hooks for this feature
│           ├── schemas/      # Zod validation schemas
│           ├── screens/      # Screen layouts for this feature
│           └── store/        # Feature-specific state (Zustand)
├── app.config.ts             # Dynamic Expo config (handles Sentry & Env variables dynamically)
└── eas.json                  # Expo Application Services configuration
```

## 🛠 Getting Started

### 1. Prerequisites
- Node.js (>= 20.x)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

### 2. Environment Setup
Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```
Fill in your specific API URLs and Sentry credentials (if applicable).

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the App
```bash
# Start the Expo development server
npm run start

# Run natively on Android
npm run android

# Run natively on iOS (Requires macOS)
npm run ios

# Run on the Web
npm run web
```

## 📦 Building for Production (EAS Local Builds)

This boilerplate comes pre-configured with `eas.json` for **local offline builds** using EAS CLI. 

Make sure you have logged into your Expo account (`eas login`) and initialized the project (`eas init`).

```bash
# Build Android APK (for local testing/sharing)
npm run build:android:apk

# Build Android App Bundle (.aab for Play Store)
npm run build:android:aab

# Build iOS Simulator build
npm run build:ios:sim

# Build iOS Production build (for TestFlight/App Store)
npm run build:ios:prod
```

## 🔒 Environment Variable Safety
The build process is protected by a dynamic `app.config.ts`. If Sentry environment variables are missing during a build or CI/CD pipeline, the build will gracefully disable the Sentry plugin instead of failing, ensuring smooth development and deployments.

## ✍️ Code Quality
```bash
# Run ESLint & Prettier check
npm run lint

# Auto-fix linting and formatting issues
npm run format
```

---
*Built for scale, speed, and modern React Native development.*
