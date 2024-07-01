import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cyje.tekiens',
  appName: 'Tekiens',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
