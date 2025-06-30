const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add additional extensions for TypeScript files
const { resolver } = config;
resolver.sourceExts = [...resolver.sourceExts, 'mjs', 'cjs'];

<<<<<<< HEAD
// Add environment configuration
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  process: path.resolve(__dirname, 'node_modules/process'),
};

// Add environment configuration
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

=======
>>>>>>> a0ceb0d07c76d30da3895ed28c088c71277282c1
module.exports = config;