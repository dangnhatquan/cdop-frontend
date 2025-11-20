import { BlocksContent } from "@strapi/blocks-react-renderer";
import { IHero } from "./home";
import { IImage } from "./common";

export interface IGallery {
    hero: IHero;
    introduction: BlocksContent;
    images: IImage[];
}