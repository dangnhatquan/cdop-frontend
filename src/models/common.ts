import { BlocksContent } from "@strapi/blocks-react-renderer";


export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;

export type TLocale = (typeof SUPPORTED_LANGUAGES)[number];

export type Maybe<T> = T | undefined | null;

export interface ICustomImage {
    caption: string;
    image: IImage
}

export interface IImage {
    url: string;
    mime: string;
}

export interface Block {
    heading: string;
    subheading: string;
    paragraph: BlocksContent;
    images: ICustomImage[];
}

export interface IContact {
    facebookUrl: string;
    intagramUrl: string;
    adminEmail: string;
    marketingEmail: string;
    primaryEmail: string;
    bookingUrl: string;
}