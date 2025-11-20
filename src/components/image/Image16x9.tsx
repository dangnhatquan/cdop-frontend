import React, { FC } from "react";
import { transformURL } from "@utils/functions";

interface IImage9x16Props {
  actualWidth: number;
  widthRatio: number;
  heightRatio: number;
  caption?: string;
  url?: string;
}

const CustomImage: FC<IImage9x16Props> = ({
  actualWidth,
  widthRatio,
  heightRatio,
  caption,
  url,
}) => {
  const width = actualWidth;
  const height = (actualWidth * heightRatio) / widthRatio;

  return (
    <div className="w-full h-full !object-cover">
      <div
        className="relative mobile:hidden"
        style={{
          objectFit: "cover",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {caption && (
          <div className="absolute top-[-44px] left-0 subheading text-sand-700">
            {caption}
          </div>
        )}
        <img
          width={`${width}px`}
          height={`${height}px`}
          className="!w-full !h-full !object-cover"
          src={transformURL(url || "")}
          loading="lazy"
          alt="Image"
        />
      </div>
      <div className="hidden mobile:block mobile:relative mobile:w-full mobile:h-full">
        {caption && (
          <div className="absolute top-[-44px] left-0 subheading mobile:top-[-30px] text-sand-700 line-clamp-1 max-h-8">
            {caption}
          </div>
        )}
        <img
          width="400"
          height="300"
          className="!w-full !h-full !object-cover"
          src={transformURL(url || "")}
          loading="lazy"
          alt="Image"
        />
      </div>
    </div>
  );
};

export default CustomImage;
