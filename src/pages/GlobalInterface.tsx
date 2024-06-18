
export interface GlobalAssociationData {
    id: number;
    names: string[];
    theme: string;
    logo: string;
    color: string;
    description: string;
    socials: SocialsData[];
    campus: string;
}

export interface AssociationMainData {
    id: any;
    name: any;
    theme: any;
    logo: any;
    color: any;
}

export interface SocialsData{
    id: string;
    link: string;
}
