import { AssosData, EventData } from "./Interfaces/EventAndAssoInterface";
import i18next from 'i18next';
import { filterByCampus } from "./LocalStorage/LocalStorageEvents";

// Possible event status
export const eventStatus: { [key: string]: string } = {
    programmed: 'event.status.programmed',
    cancelled: 'event.status.cancelled',
    rescheduled: 'event.status.rescheduled',
    full: 'event.status.full',
    movedOnline: 'event.status.movedOnline',
};

/**
 * Function to get an event status from its date
 * @param event the event we want to get the status
 * @returns the event status
 */
export function getEventStatus(event: EventData): string {

    const eventDate = new Date(Date.parse(event.date + 'Z'));
    const now = new Date();
    const eventEndDate = new Date(eventDate.getTime() + (event.duration ?? 0) * 60 * 1000);

    if (eventEndDate < now) {
        return 'event.status.finished';
    }

    if (eventDate < now) {
        return 'event.status.ongoing';
    }

    if (eventStatus[event.status]) {
        return eventStatus[event.status];
    }

    return event.status;
}

/**
 * Function to return a string with the right format to a date
 * @param date the string in the right format
 * @returns the date from the string
 */
export const formatDate = (date: string) => {
    return new Date(date + 'Z').toLocaleString(i18next.language, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Function to return the duration of an event in a string with its duration in days, hours and minutes
 * @param event the event we want to calculat the duration
 * @returns the event duration in days, hours and minutes
 */
export const duration = (event: EventData) => {
    if (!event.duration) {
        return undefined;
    }

    const duration = event.duration;

    let days = Math.floor(duration / 60 / 24);
    let hours = Math.floor(duration / 60) % 24;
    let minutes = duration % 60;

    return `${days}j ${hours}h ${minutes}min`.replace(/0j /, '').replace(/0h /, '').replace(/ 0min/, '');
}

/**
 * Function to return the duration of an event in an array with the its duration in days, hours and minutes
 * @param duration the event duration
 * @returns the array with the events duration in days, hours and minutes
 */
export const durationToArray = (duration: number) => {
    if (!duration) {
        return [0, 0, 0];
    }

    let days = Math.floor(duration / 60 / 24);
    let hours = Math.floor(duration / 60) % 24;
    let minutes = duration % 60;

    return [days, hours, minutes];
}

/**
 * Function to return 
 * @param eventsData the data with events
 * @returns 
 */
export const getEventsByWeek = (eventsData: Array<EventData>) => {
    return eventsData.reduce((o: { [key: string]: EventData[] }, event) => {
        const monday = getMonday(new Date(event.date + 'Z').toString());
        const key = `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
        if (!o[key]) o[key] = [];
        o[key].push(event);
        return o;
    }, {});
}

/**
 * Method to geek the week name according to a date
 * @param date the date we want to know the week name
 * @returns an arrayr with the sentence if we need it the date
 */
export const getWeekName = (date: string) => {
    let monday = getMonday(date);
    if (monday.getTime() == getMonday(new Date().toString()).getTime())
        return ['events.week.this-week', ''];
    if (monday.getTime() == getMonday(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toString()).getTime())
        return ['events.week.next-week', ''];
    if (monday.getTime() == getMonday(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toString()).getTime())
        return ['events.week.last-week', ''];
    return ['events.week.week-of', new Date(monday).toLocaleDateString('FR-fr')];
}

/**
 * Function to calculatee the date of the monday of the given date
 * @param dateString the date in string
 * @returns the date of the mondays of the given date
 */
const getMonday = (dateString: string) => {
    const date = new Date(dateString);
    let weekday = (date.getDay() || 7) - 1;
    let monday = new Date((date.getTime() - weekday * 24 * 60 * 60 * 1000));
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
}

/**
 * Method to return the filtered data for the futur events
 * @param eventsData the data we want to filter
 * @param filter the filter
 * @returns return the filtered data for the futur events
 */
export const getFilteredEvents = (eventsData: EventData[], assosData: AssosData[], filter: string) => {
    const currentDate = new Date();

    const campusFilteredData = filterByCampus(eventsData, assosData);

    switch (filter) {
        case 'futur':
            return campusFilteredData.filter(event => new Date(event.date + 'Z') > currentDate).reverse();

        case 'ongoing':
            return campusFilteredData.filter(event => {
                const eventDate = new Date(event.date + 'Z');
                if (event.duration) {
                    // Convert minutes to milliseconds and add to eventDate
                    const eventEndDate = new Date(eventDate.getTime() + event.duration * 60000);
                    return eventDate <= currentDate && currentDate <= eventEndDate;
                }
                return eventDate.toDateString() === currentDate.toDateString();
            }).reverse();

        case 'past':
            return campusFilteredData.filter(event => {
                const eventDate = new Date(event.date + 'Z');
                if (event.duration) {
                    // Convert minutes to milliseconds and add to eventDate
                    const eventEndDate = new Date(eventDate.getTime() + event.duration * 60000);
                    return eventDate < currentDate && currentDate > eventEndDate;
                }
                return new Date(event.date + 'Z') < currentDate
            });

        case 'favorite':
            const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
            return campusFilteredData.filter(event => savedEvents.includes(event.id));

        default:
            return campusFilteredData;
    }

};