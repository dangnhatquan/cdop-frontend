type TProps = React.SVGProps<SVGSVGElement>;

export const ArrowRight = ({ stroke, ...props }: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.564 15.236h17.222l-4.496 -4.777 1.748 -1.645 6.4 6.8v1.645l-6.4 6.8 -1.748 -1.645 4.497 -4.778H5.563z"
      fill="#686354"
    />
  </svg>
);
