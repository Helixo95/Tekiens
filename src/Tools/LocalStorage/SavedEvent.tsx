/**
 * Function to add or remove an event
 * @param eventID the event we want to add or remove
 * @param setIsSaved the useState function to update isSaved
 */
export const saveEvent = (eventID: number, setIsSaved: Function) => {
    if (isEventSaved(eventID)) {
        removeSavedEvent(eventID);
        setIsSaved(false);
    } else {
        addSavedEvent(eventID);
        setIsSaved(true);
    }
}

/**
 * Function to check if an event is save
 * @param eventID the event id
 * @returns true if the event's saved or false if not
 */
export const isEventSaved = (eventID: number) => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    if (savedEvents) {
        return savedEvents.includes(eventID);
    }
    return false;
}

/**
 * Function to remove an event to the saved event
 * @param eventID the event id we want to remove
 */
const removeSavedEvent = (eventID: number) => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    if (savedEvents && savedEvents.includes(eventID)) {
        savedEvents.pop(eventID);
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }
    else {
        console.log("Can't remove " + eventID + " because he's not in the saved event");
    }
}

/**
 * Function to add an event to the saved event
 * @param eventID the event id we want to add
 */
const addSavedEvent = (eventID: number) => {
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    if (savedEvents && !savedEvents.includes(eventID)) {
        savedEvents.push(eventID);
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }
    else {
        console.log("Can't add " + eventID + " because he's already in the saved event");
    }
}