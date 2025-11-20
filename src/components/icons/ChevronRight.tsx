import * as React from "react";
type TProps = React.SVGProps<SVGSVGElement>;
const ChevronRight = (props: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.333 2.667 22.666 16 9.333 29.334"
      stroke="#686354"
      strokeWidth={4}
      strokeMiterlimit={10}
      strokeLinecap="square"
    />
  </svg>
);
export default ChevronRight;
