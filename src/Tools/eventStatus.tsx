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