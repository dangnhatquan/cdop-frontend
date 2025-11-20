import { IHero } from "./home";
import { Block, IImage } from "./common";

export interface IContactUs {
    hero: IHero;
    block: Block;
    contactImage: IImage;
    posts: IPost[];
}

export interface IPost {
    name: string;
    description: Block;
    image: IImage;
    url: string;
}