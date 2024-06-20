import { AllEventsData } from "./Interfaces/EventInterface";

export const eventStatus: { [key: string]: string } = {
    programmed: '🟩 À venir',
    cancelled: '🟥 Annulé',
    rescheduled: '🟧 Reporté',
    full: '🟨 Complet',
    movedOnline: '🟦 Déplacé en ligne'
};

export function getEventStatus(event: AllEventsData): string {
    const eventDate = new Date(Date.parse(event.date + 'Z'));
    const now = new Date();
    const eventEndDate = new Date(eventDate.getTime() + (event.duration ?? 0) * 60 * 1000);

    if (eventEndDate < now) {
        return '⬛ Terminé';
    }

    if (eventDate < now) {
        return '🟪 En cours';
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
 * Function to return a string with the right format to a date, format : YYYY-MM-DD HH:MM:SS
 * @param date the string in the right format
 * @returns the date from the string
 */
export const formatDate = (date: string) => {
    return new Date(date + 'Z').toLocaleString('FR-fr', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
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