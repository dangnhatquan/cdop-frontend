import { BlocksContent } from "@strapi/blocks-react-renderer";
import { IImage } from "./common";

export interface ILocation {
  address: string;
  phoneNumber: string;
  image: IImage;
  googleMapUrl: string;
  openAt: string;
  closeAt: string;
  workingHours: BlocksContent;
}
