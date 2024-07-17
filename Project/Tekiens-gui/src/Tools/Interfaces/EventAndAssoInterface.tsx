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
    logos: string[];
    color: string;
    description: string;
    socials: string[];
    campus: string;
    room: string,
    start: string,
    end: string
}
/*
export interface SocialsData {
    id: string;
    display: string;
    link: string;
    value: string;
}*/

// Register the different ids that can be used in the selectbox of 'SocialsLink.tsx'
export enum SocialType {
    DISCORD = 'discord',
    INSTAGRAM = 'instagram',
    TWITTER = 'twitter',
    EMAIL = 'email',
    TELEGRAM = 'telegram'
}

export const SocialsDisplay: { [key: string]: string } = {
    discord: 'Discord',
    instagram: 'Instagram',
    twitter: 'twitter',
    email: 'Email',
    telegram: 'Telegram'
}

export const SocialsURL: { [key: string]: string } = {
    discord: 'https://discord.gg/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    email: '',
    telegram: 'https://t.me/'
}
