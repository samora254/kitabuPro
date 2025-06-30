// Development configuration
export const DEV_CONFIG = {
  // Set to true to enable development bypass mode
  BYPASS_VALIDATION: __DEV__, // Automatically enabled in development
  
  // Visual indicator for development mode
  SHOW_DEV_INDICATOR: __DEV__,
  
  // Skip authentication requirements
  BYPASS_AUTH: __DEV__,
  
  // Allow empty form submissions
  ALLOW_EMPTY_FORMS: __DEV__,
};

// Development mode utilities
export const isDevelopmentBypass = () => DEV_CONFIG.BYPASS_VALIDATION;
export const shouldShowDevIndicator = () => DEV_CONFIG.SHOW_DEV_INDICATOR;
export const shouldBypassAuth = () => DEV_CONFIG.BYPASS_AUTH;
export const shouldAllowEmptyForms = () => DEV_CONFIG.ALLOW_EMPTY_FORMS;