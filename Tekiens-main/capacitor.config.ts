import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cyje.tekiens',
  appName: 'Tekiens',
  webDir: 'dist',
  plugins: {
      "LocalNotifications": {
        "iconColor": "#488AFF",
        "sound": "beep.wav"
      }
    }
};

export default config;