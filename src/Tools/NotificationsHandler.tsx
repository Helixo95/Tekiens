import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications"

/** Try sending a notification to the users mobile
 * @param title The name of the notification
 * @param body A brief description of the notification
 * @param date The time when the notification should be sent
 * @param eventID The id of the event (useful to be able to track the notification)
*/
export async function sendNotification(title: string, body: string, date: Date, eventID: number) {
    const exists = await doesNotificationExist(eventID);

    if (exists) {
        console.log("Notification with ID ", eventID, " already exists!");
        return;
    }

    const options: ScheduleOptions = {
        notifications: [
            {
                id: eventID,
                title: title,
                body: body,
                smallIcon: 'res://drawable/logo',
                largeIcon: 'res://drawable/logo',
                schedule: {
                    at: date,
                    allowWhileIdle: true
                }
            }
        ]
    };

    try {
        await LocalNotifications.schedule(options);
        console.log("Notification scheduled successfully");
    } catch (error) {
        console.error("Error scheduling notification:", error);
    }
}


/** Cancel a notification in function of its id
 * @param id The id of the notification
 */
export async function cancelNotification(id: number) {
    try {
        LocalNotifications.cancel({
            notifications: [{ id: id }]
        });

        console.log("Notification: ", id, " has been cancelled");
    }

    catch (err) {
        console.error("Error while cancelling the notificiation: ", JSON.stringify(err));
    }
}

export async function getPending() {
    const pendingNotification = await LocalNotifications.getPending();
    console.log(pendingNotification);
}

/** Check if a notification is going to be pushed in the futur
 * @param id The id of the notification
 */
export async function doesNotificationExist(id: number) {
    try {
        // Retrieve all scheduled notifications
        const pendingNotifications = await LocalNotifications.getPending();

        // Check if any of the pending notifications match the given ID
        const notificationExists = pendingNotifications.notifications.some(notification => notification.id === id);

        return notificationExists;
    } catch (error) {
        console.error('Error checking notification existence:', error);
        return false; // Return false if there's an error (could not determine existence)
    }
}

/** Ask the user for notifications permissions
 */
export async function askUserForNotification() {
    await LocalNotifications.requestPermissions();
}

/** Check the notification values
 * @return A string value checking that the permission isn't denied 'on' or 'off'
 */
export async function checkNotificationPermission() {
    const display = (await LocalNotifications.checkPermissions()).display;
    console.log('Notification permission status:', display);
    return display != "denied"
}