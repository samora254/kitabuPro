
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
      }
    }
  }
};
