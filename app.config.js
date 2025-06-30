<<<<<<< HEAD
=======

>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
      output: "static",
=======
      output: "single",
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
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
<<<<<<< HEAD
      },
      OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "demo-api-key",
      PINECONE_API_KEY: process.env.EXPO_PUBLIC_PINECONE_API_KEY || "demo-api-key"
    }
  }
};
=======
      }
    }
  }
};
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
