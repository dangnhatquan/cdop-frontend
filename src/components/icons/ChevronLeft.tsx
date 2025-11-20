import * as React from "react";
type TProps = React.SVGProps<SVGSVGElement>;
const ChevronLeft = (props: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.667 2.667 9.333 16l13.334 13.333"
      stroke="#686354"
      strokeWidth={4}
      strokeMiterlimit={10}
      strokeLinecap="square"
    />
  </svg>
);
export default ChevronLeft;
