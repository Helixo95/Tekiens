export interface EventData {
    id: number;
    asso_id: string;
    title: string;
    poster: string | null;
    description: string | null;
    date: string;
    place: string;
    duration: number | null;
    price: string | null;
    link: string | null;
    access: string | null;
    status: string;
    capacity: string | null;
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