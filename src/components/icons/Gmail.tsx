type TProps = React.SVGProps<SVGSVGElement>;
import * as React from "react";
const Gmail = (props: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.128 6.705 16 15.267l12.872-8.562A2.5 2.5 0 0 0 26.5 4.998h-21c-1.103 0-2.04.715-2.372 1.707M29 10.092l-12.252 8.206a1.5 1.5 0 0 1-1.496 0L3 10.093v14.405a2.5 2.5 0 0 0 2.5 2.5h21a2.5 2.5 0 0 0 2.5-2.5zM0 7.499a5.5 5.5 0 0 1 5.5-5.5h21a5.5 5.5 0 0 1 5.5 5.5v17a5.5 5.5 0 0 1-5.5 5.5h-21a5.5 5.5 0 0 1-5.5-5.5z"
      fill={props?.color ?? "#F0EFEE"}
    />
  </svg>
);
export default Gmail;
