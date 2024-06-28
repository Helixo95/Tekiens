export interface SomeEventsData {
    id: number;
    asso_id: string;
    title: string;
    poster: string;
    date: string;
    place: string;
    associationName?: string;
    associationCampus?: string;
    associationColor?: string;
}

export interface AllEventsData {
    id: number;
    asso_id: string;
    title: string;
    poster: string;
    description: string;
    date: string;
    place: string;
    duration: number;
    price: number;
    link: string;
    access: string;
    status: string;
    capacity: string;
    createDate: string;
    lastUpdateDate: string;
    associationName?: string;
    associationColor?: string;
}

export interface EventData {
    id: number;
    asso_id: string;
    title: string;
    poster: string;
    description: string;
    date: string;
    place: string;
    duration: number;
    price: number;
    link: string;
    access: string;
    status: string;
    capacity: string;
    createDate: string;
    lastUpdateDate: string;
}

export interface ApiResponseEvents {
    success: boolean;
    data: SomeEventsData[];
}

export interface ApiResponseEvent {
    success: boolean;
    data: AllEventsData;
}

export interface AssosData {
    id: number;
    names: string[];
    theme: string;
    logo: string;
    color: string;
    description: string;
    socials: SocialsData[];
    campus: string;
}

export interface SocialsData {
    id: string;
    display: string;
    link: string;
    value: string;
}