export interface EventData {
    id: number;
    asso_id: string;
    title: string;
    poster: string;
    description: string;
    date: string;
    place: string;
    duration: number | null;
    price: string;
    link: string;
    access: string;
    status: string;
    capacity: string;
    createDate: string;
    lastUpdateDate: string;
}

export interface AssosData {
    id: string;
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