import classNames from "classnames";
import { FC, ReactNode } from "react";

type TSize = "small" | "default";

interface IButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  isFullWidth?: boolean;
  type?: "primary" | "default";
  bordered?: boolean;
  size?: TSize;
}

export const Button: FC<IButtonProps> = ({
  children,
  onClick,
  isFullWidth = false,
  type = "primary",
  bordered = true,
  size = "default",
}) => {
  const classes = classNames("font-gilroy", {
    "w-full": isFullWidth,
    "text-[18px] text-white bg-[#686354] px-4 py-4 mobile:px-2 mobile:py-2":
      type === "primary",
    "text-[18px] text-stone bg-white px-4 py-4 mobile:px-2 mobile:py-2":
      type === "default",
    "border border-stone": bordered,
    "!text-[12px]": size === "small",
  });

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
