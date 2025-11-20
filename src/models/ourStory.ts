import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Block } from "./common";
import { IExperience, IHero } from "./home";

export interface IOurStory {
  hero: IHero;
  headChef: Block;
  team: Block[];
  experience: IExperience;
  opening: BlocksContent;
  stories: Block[];
  career: Block;
}
