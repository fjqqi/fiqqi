export interface Project {
    id: string;
    title: string;
    link: string;
    url: string;
    category: string;
    image: string;
    bgColor: string;
    accentColor?: string;
    tags?: string[];
    type?: string;
    /** Extended fields for detail pages */
    description?: {
        en: string;
        id: string;
    };
    role?: string;
    year?: string;
    client?: string;
    gallery?: string[];
}
