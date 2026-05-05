/**
 * Environment Configuration
 * 
 * This file provides secure access to environment variables
 * with validation and type safety.
 */

interface EnvConfig {
  smtpHost: string;
  googleMapsApiKey: string;
  port: number;
  nodeEnv: string;
}

/**
 * Validates and loads environment variables
 */
function validateEnv(): EnvConfig {
  const smtpHost = process.env.SMTP_HOST;
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
  const port = process.env.PORT;
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Validate required environment variables
  const errors: string[] = [];

  if (!smtpHost) {
    errors.push('SMTP_HOST is required for contact email (set in server / Netlify / Docker env)');
  } else if (smtpHost === 'smtp.example.com') {
    errors.push('SMTP_HOST is using placeholder value — configure your real SMTP host');
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
    if (!process.env.SMTP_USER) {
      errors.push('SMTP_USER should be set in production for contact email');
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
    smtpHost: smtpHost || '',
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
