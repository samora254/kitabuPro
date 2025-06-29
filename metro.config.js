// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add additional extensions for TypeScript files
const { resolver } = config;
resolver.sourceExts = [...resolver.sourceExts, 'mjs', 'cjs'];

module.exports = config;
// Explicitly handle the problematic expo-modules-core TypeScript file
resolver.resolveRequest = (context, moduleName, platform) => {
  // Specifically target the problematic import path
  if (moduleName === 'expo-modules-core/src/index.ts' || 
      moduleName.includes('expo-modules-core/src/index.ts')) {
    return {
      filePath: path.resolve(__dirname, 'node_modules/expo-modules-core/build/index.js'),
      type: 'sourceFile',
    };
  }
  
  // Default resolution for all other modules
  return context.resolveRequest(context, moduleName, platform);
};