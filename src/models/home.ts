import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Block, ICustomImage, IImage } from "./common";

export interface IHero {
  id: number;
  title: string;
  media: IImage;
}

export interface IIntroduction {
  id: number;
  title: string;
  description: BlocksContent;
  upperImage: IImage;
  lowerImage: IImage;
}

export interface ISpace {
  id: number;
  upperImage: IImage;
  lowerImage: IImage;
}

export interface IHome {
  id: number;
  hero: IHero;
  introduction: IIntroduction;
  headChef: Block;
  team: Block[];
  space: ISpace;
  gallery: ICustomImage[];
  // experience: IExperience;
  career: Block;

  first: Block;
  second: Block;
  third: Block;
  fourth: Block;
}

export interface IExperience {
  first?: Block;
  second?: Block;
  third?: Block;
  fourth?: Block;
}
