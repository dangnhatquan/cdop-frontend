import { Block, ICustomImage, IImage } from "./common";
import { IHero } from "./home";

export interface IMenu {
    hero: IHero;
    description: Block;
    signatureDishes: IImage[];
    ingredients: IImage[];
    tastingMenuImages: IImage[];
    tastingMenu: IImage[];
    wineMenuImages: IImage[];
    wineMenu: IImage[];
}