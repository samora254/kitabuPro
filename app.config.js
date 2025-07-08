export default {
  expo: {
    name: "Kitabu AI",
    slug: "kitabu-ai-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kitabu.ai"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.kitabu.ai"
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: "kitabu-ai-app"
      },
      EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "demo-api-key",
      EXPO_PUBLIC_PINECONE_API_KEY: process.env.EXPO_PUBLIC_PINECONE_API_KEY || "demo-api-key",
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
      EXPO_PUBLIC_MPESA_CONSUMER_KEY: process.env.EXPO_PUBLIC_MPESA_CONSUMER_KEY,
      EXPO_PUBLIC_MPESA_CONSUMER_SECRET: process.env.EXPO_PUBLIC_MPESA_CONSUMER_SECRET,
      EXPO_PUBLIC_MPESA_PASSKEY: process.env.EXPO_PUBLIC_MPESA_PASSKEY,
      EXPO_PUBLIC_MPESA_SHORTCODE: process.env.EXPO_PUBLIC_MPESA_SHORTCODE,
      EXPO_PUBLIC_MPESA_CALLBACK_URL: process.env.EXPO_PUBLIC_MPESA_CALLBACK_URL
    }
  }
};