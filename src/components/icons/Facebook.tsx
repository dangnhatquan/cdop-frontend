import * as React from "react";
type TProps = React.SVGProps<SVGSVGElement>;
const Facebook = (props: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1218_998)">
      <path
        d="M28.25 0H3.75C1.68213 0 0 1.68213 0 3.75V28.25C0 30.3179 1.68213 32 3.75 32H28.25C30.3179 32 32 30.3179 32 28.25V3.75C32 1.68213 30.3179 0 28.25 0ZM29.5 28.25C29.5 28.9392 28.9392 29.5 28.25 29.5H20.875V20.375H24.8767L25.343 16.5H20.875V12.3125C20.875 11.2437 21.6812 10.4375 22.75 10.4375H25.5625V6.8125C24.8223 6.70801 23.3943 6.5625 22.75 6.5625C21.2922 6.5625 19.8311 7.17749 18.7412 8.24951C17.6184 9.354 17 10.8008 17 12.3235V16.5H12.9375V20.375H17V29.5H3.75C3.06079 29.5 2.5 28.9392 2.5 28.25V3.75C2.5 3.06079 3.06079 2.5 3.75 2.5H28.25C28.9392 2.5 29.5 3.06079 29.5 3.75V28.25Z"
        fill={props?.color ?? "#F0EFEE"}
      />
    </g>
    <defs>
      <clipPath id="clip0_1218_998">
        <rect width={32} height={32} fill={props?.color ?? "#F0EFEE"} />
      </clipPath>
    </defs>
  </svg>
);
export default Facebook;
