type TProps = React.SVGProps<SVGSVGElement>;

export const ArrowLeft = ({ stroke, ...props }: TProps) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M26.436 17.636H9.215l4.496 4.778-1.748 1.645-6.4-6.8v-1.644l6.4-6.8 1.748 1.645-4.497 4.777h17.223z"
      fill="#686354"
    />
  </svg>
);
