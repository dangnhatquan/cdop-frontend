import { FC } from "react";

interface IAnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedWrapper: FC<IAnimatedWrapperProps> = ({
  children,
  className,
  delay,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-delay={delay}
      className={className}
    >
      {children}
    </div>
  );
};
