import { AssosData, EventData } from "../Interfaces/EventAndAssoInterface";

/**
 * Function to return data filtered by the campus
 * @param eventData the event data we want to filter
 * @param assosData the assos data we use to get the event campus
 * @returns the event data filtered by the campus
 */
export function filterByCampus(eventData: EventData[], assosData: AssosData[]) {
    if (!eventData) {
        return [];
    }

    const campus = localStorage.getItem("selectedCampus") || 'all';

    if (campus == "all") {
        return eventData;
    }

    const assoCampusMap: { [key: string]: string } = {};
    assosData.forEach(asso => {
        assoCampusMap[asso.id] = asso.campus;
    });

    return eventData.filter(event => assoCampusMap[event.asso_id] === campus);
}

/**
 * Function to add or remove an event from the saved events
 * @param eventID the event id we want to add or remove
 * @param setIsSaved the useState function to update isSaved
 */
export const saveEvent = (eventID: number, setIsSaved: Function) => {
    console.log(eventID);
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
    console.log(eventID)
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    if (savedEvents) {
        return savedEvents.includes(eventID);
    }
    return false;
}

/**
 * Function to remove an event to the saved events
 * @param eventID the event id we want to remove
 */
const removeSavedEvent = (eventID: number) => {
    // Retrieve existing data
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    // Check if we have data and check if the event is saved
    if (savedEvents && savedEvents.includes(eventID)) {
        // Remove the eventID to the array
        const newSavedEvents = savedEvents.filter((id: number) => id !== eventID);

        // Update localStorage with the new array
        localStorage.setItem("savedEvents", JSON.stringify(newSavedEvents));
    }
    else {
        console.log("Can't remove " + eventID + " because he's not in the saved events.");
    }
}

/**
 * Function to add an event to the saved events
 * @param eventID the event id we want to add
 */
const addSavedEvent = (eventID: number) => {
    // Retrieve existing data
    const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]");

    // Check if we have data and check if the event is saved
    if (savedEvents && !savedEvents.includes(eventID)) {
        // Add the eventID to the array
        savedEvents.push(eventID);

        // Update localStorage with the new array
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }
    else {
        console.log("Can't add " + eventID + " because he's already saved.");
    }
}