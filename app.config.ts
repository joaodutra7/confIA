export const appConfig = {
  name: 'CISER CorroScan',
  company: 'Ciser - Parafusos e Porcas',
  description: 'Detecção de corrosão em tempo real por IA para parafusos e porcas',
  version: '1.0.0',
  location: 'Jaraguá do Sul, SC',
  founded: '1959',
  tagline: 'Tecnologia e qualidade desde 1959',
  
  // Corrosion thresholds (configurable per piece type)
  corrosionThresholds: {
    approved: 30,      // <= 30%
    inspection: 60,    // 31-60%
    rejected: 100,     // > 60%
  },

  // Supported languages
  languages: {
    'pt-BR': 'Português (Brasil)',
    'en-US': 'English (US)',
  },
  
  // Default settings
  defaults: {
    language: 'pt-BR',
    theme: 'light',
    itemsPerPage: 10,
  },

  // API endpoints
  api: {
    baseUrl: process.env.NODE_ENV === 'production' ? '/api' : '/api',
    timeout: 30000,
  },

  // PWA settings
  pwa: {
    name: 'CISER CorroScan',
    shortName: 'CorroScan',
    description: 'Sistema de detecção de corrosão industrial',
    themeColor: '#0C305F',
    backgroundColor: '#ffffff',
  },
} as const;

export type AppConfig = typeof appConfig;