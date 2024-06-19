export interface SomeEventsData {
    id: number;
    asso_id: string;
    title: string;
    poster: string;
    date: string;
    place: string;
    associationName?: string;
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

export interface ApiResponseEvents {
    success: boolean;
    data: SomeEventsData[];
}

export interface ApiResponseEvent {
    success: boolean;
    data: AllEventsData;
}