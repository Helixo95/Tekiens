import { AllEventsData, SomeEventsData } from "./Interfaces/EventInterface";
import i18next from 'i18next';

const eventStatus: { [key: string]: string } = {
    programmed: 'event.status.programmed',
    cancelled: 'event.status.cancelled',
    rescheduled: 'event.status.rescheduled',
    full: 'event.status.full',
    movedOnline: 'event.status.movedOnline',
    finished: 'event.status.finished',
    ongoing: 'event.status.ongoing',
};

export function getEventStatus(event: AllEventsData): string {

    const eventDate = new Date(Date.parse(event.date + 'Z'));
    const now = new Date();
    const eventEndDate = new Date(eventDate.getTime() + (event.duration ?? 0) * 60 * 1000);

    if (eventEndDate < now) {
        return eventStatus['finished'];
    }

    if (eventDate < now) {
        return eventStatus['ongoing'];
    }

    if (eventStatus[event.status]) {
        return eventStatus[event.status];
    }

    return event.status;
}

/**
 * Function to darken a color with a set amount
 * @param hex the color we want to darken
 * @param amount the amount we want to darken the color
 * @returns the new darker color
 */
export const darkenColor = (hex: string | undefined, amount = 20) => {
    if (hex) {

        hex = hex.slice(1);

        let num = parseInt(hex, 16);

        let r = (num >> 16) - amount;
        let g = ((num >> 8) & 0x00FF) - amount;
        let b = (num & 0x0000FF) - amount;

        r = Math.max(r, 0);
        g = Math.max(g, 0);
        b = Math.max(b, 0);

        return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    return '#000000';
}

/**
 * Function to return a string with the right format to a date
 * @param date the string in the right format
 * @returns the date from the string
 */
export const formatDate = (date: string) => {
    return new Date(date + 'Z').toLocaleString(i18next.language, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
}

/**
 * Function to return the duration of an event in days, hours and minutes
 * @param event the event we want to calculat the duration
 * @returns the event's duration in days, hours and minutes
 */
export const duration = (event: AllEventsData) => {
    if (!event.duration)
        return undefined;
    var days = Math.floor(event.duration / 60 / 24);
    var hours = Math.floor(event.duration / 60) % 24;
    var minutes = event.duration % 60;
    return `${days}j ${hours}h ${minutes}min`.replace(/0j /, '').replace(/0h /, '').replace(/ 0min/, '');
}

export const getEventsByWeek = (filteredEvents: Array<SomeEventsData>) => {
    return filteredEvents.reduce((o: { [key: string]: SomeEventsData[] }, event) => {
        const monday = getMonday(new Date(event.date + 'Z').toString());
        const key = `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
        if (!o[key]) o[key] = [];
        o[key].push(event);
        return o;
    }, {});
}

export const getWeekName = (date: string) => {
    let monday = getMonday(date);
    if (monday.getTime() == getMonday(new Date().toString()).getTime())
        return ['this-week', ''];
    if (monday.getTime() == getMonday(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toString()).getTime())
        return ['next-week', ''];
    if (monday.getTime() == getMonday(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toString()).getTime())
        return ['last-week'];
    return ['week-of', new Date(monday).toLocaleDateString(i18next.language)];
}

const getMonday = (dateString: string) => {
    const date = new Date(dateString);
    let weekday = (date.getDay() || 7) - 1;
    let monday = new Date((date.getTime() - weekday * 24 * 60 * 60 * 1000));
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
}