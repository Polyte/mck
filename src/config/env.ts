/**
 * Environment Configuration
 * 
 * This file provides secure access to environment variables
 * with validation and type safety.
 */

interface EnvConfig {
  resendApiKey: string;
  googleMapsApiKey: string;
  port: number;
  nodeEnv: string;
}

/**
 * Validates and loads environment variables
 */
function validateEnv(): EnvConfig {
  const resendApiKey = process.env.RESEND_API_KEY;
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const port = process.env.PORT;
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Validate required environment variables
  const errors: string[] = [];

  if (!resendApiKey) {
    errors.push('RESEND_API_KEY is required');
  } else if (resendApiKey === 'your_resend_api_key_here') {
    errors.push('RESEND_API_KEY is using placeholder value - please set a real API key');
  }

  if (!googleMapsApiKey) {
    errors.push('GOOGLE_MAPS_API_KEY is required');
  } else if (googleMapsApiKey === 'your_google_maps_api_key_here') {
    errors.push('GOOGLE_MAPS_API_KEY is using placeholder value - please set a real API key');
  }

  if (!port) {
    errors.push('PORT is required');
  }

  // If in production, require real API keys
  if (nodeEnv === 'production') {
    if (resendApiKey?.startsWith('re_') && resendApiKey.length < 20) {
      errors.push('RESEND_API_KEY appears to be using a placeholder or test key in production');
    }
    if (googleMapsApiKey?.startsWith('YOUR_')) {
      errors.push('GOOGLE_MAPS_API_KEY is using placeholder value in production');
    }
  }

  if (errors.length > 0) {
    console.error('Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    
    if (nodeEnv === 'production') {
      throw new Error('Environment validation failed in production');
    } else {
      console.warn('Running in development mode with incomplete configuration');
    }
  }

  return {
    resendApiKey: resendApiKey || '',
    googleMapsApiKey: googleMapsApiKey || '',
    port: parseInt(port || '3001', 10),
    nodeEnv,
  };
}

/**
 * Export validated environment configuration
 */
export const env = validateEnv();

/**
 * Helper function to check if we're in development
 */
export const isDevelopment = env.nodeEnv === 'development';

/**
 * Helper function to check if we're in production
 */
export const isProduction = env.nodeEnv === 'production';

/**
 * Helper function to get safe API keys for client-side usage
 * (Only expose non-sensitive keys to client)
 */
export const getClientEnv = () => ({
  googleMapsApiKey: env.googleMapsApiKey,
  nodeEnv: env.nodeEnv,
});
