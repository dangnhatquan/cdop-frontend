import Image from "next/image";
import { ICustomImage, IImage } from "@models/common";
import { Carousel } from "antd";

interface ICustomCarouselProps {
  images: ICustomImage[] | IImage[];
  actualWidth: number;
  widthRatio: number;
  heightRatio: number;
}

export const CustomCarousel = ({
  images,
  actualWidth,
  widthRatio,
  heightRatio,
}: ICustomCarouselProps) => {
  return (
    <Carousel className="mobile:w-full" autoplay>
      {images?.map((image, index) => {
        const imageUrl = "image" in image ? image?.image?.url : image?.url;

        return (
          <div
            key={`custom-image-${index}`}
            className="relative w-full aspect-[3/4]"
          >
            {imageUrl && (
              <Image
                quality={90}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
};
