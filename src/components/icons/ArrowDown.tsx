type TProps = React.SVGProps<SVGSVGElement>;

export const ArrowDown = ({ color, ...props }: TProps) => (
  <svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 16.25V3.75m0 12.5 4.25-4m-4.25 4-4.25-4"
      stroke={color ?? "#fff"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
