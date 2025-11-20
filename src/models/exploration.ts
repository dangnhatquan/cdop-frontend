import { BlocksContent } from "@strapi/blocks-react-renderer";
import { ICustomImage } from "./common";

export interface IItem {
    heading: string;
    subheading: string;
    engParagraph: BlocksContent;
    vieParagraph: BlocksContent;
    images: {
      url: string;
    }[];
}

export interface ISection {
    title: BlocksContent;
    engTitle: BlocksContent;
    image: {
      url: string;
    };
    items: IItem[];
  };

export interface IExploration {
    sections: ISection[];
};



