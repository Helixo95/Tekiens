import {FCM} from '@capacitor-community/fcm';

/** Subscribe the user to a topic thanks to its name */
export function subscribeToTopic(topicName: string) {
    FCM.subscribeTo({topic: topicName})
    .then(r => {
        alert(`Successfully subscribed to ${topicName}`+r);
    })
    .catch(error => alert(error));
}

/** Unsubscribe the user to a topic thanks to its name */
export function  unsubscribeFromTopic (topicName: string){
    FCM.unsubscribeFrom({topic: topicName})
    .then(r => alert('Unsubscribed to topic'))
    .catch(error => console.log(error));
}

/** Return the user personal token */
export function getUserToken(){
    FCM.getToken()
    .then(r => alert(`Token ${r.token}`))
    .catch(err => console.log(err));
}

/** Subscribe the user to the 'allUsers' topic only once */
export function subscribeToAllUserTopic() {
    const isSubscribed = localStorage.getItem("isSubToMain");
    if (isSubscribed === 'y') {
        alert("Already subscribed to 'allUsers' topic");
        return;
    }

    subscribeToTopic('allUsers');
    localStorage.setItem("isSubToMain", "y");
}