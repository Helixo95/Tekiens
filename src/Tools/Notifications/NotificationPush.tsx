import { PushNotifications } from '@capacitor/push-notifications';

// Register event listeners for PushNotifications
export const addListeners = async () => {
  // Listener for successful registration of device token
  await PushNotifications.addListener('registration', token => {
    //console.info('Registration token: ', token.value);
  });

  // Listener for errors during registration
  await PushNotifications.addListener('registrationError', err => {
    //console.error('Registration error: ', err.error);
  });

  // Listener for incoming push notifications when the app is in foreground/background
  await PushNotifications.addListener('pushNotificationReceived', notification => {
    //console.log('Push notification received: ', notification);
  });

  // Listener for actions performed on a push notification when the app is closed
  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    //console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

export const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

export const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}