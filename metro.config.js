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

module.exports = config;