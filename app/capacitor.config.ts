import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.eCloset',
  appName: 'e-Closet',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
