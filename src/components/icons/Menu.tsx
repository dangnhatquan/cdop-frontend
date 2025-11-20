import * as React from "react";
type TProps = React.SVGProps<SVGSVGElement>;
const Menu = (props: TProps) => (
  <svg
    width={props?.width ?? 32}
    height={props?.height ?? 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.2 6.4H2.8v2.4h26.4zm0 8.4H2.8v2.4h26.4zm0 8.4H2.8v2.4h26.4z"
      fill="#686354"
    />
  </svg>
);
export default Menu;
