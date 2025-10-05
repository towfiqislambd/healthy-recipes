import React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  text: string;
  className?: string;
  animation?: boolean;
  Variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading: React.FC<HeadingProps> = ({
  text,
  className,
  Variant = "h3",
  animation = false,
  ...props
}) => {
  const Tag = Variant;
  return (
    <Tag
      data-aos={animation ? "fade-up" : undefined}
      className={cn(
        "font-merriweather text-[24px] lg:text-[28px] 2xl:text-[32px] 3xl:text-[40px] leading-[140%] font-bold text-center",
        className
      )}
      {...props}
    >
      {text}
    </Tag>
  );
};

export default Heading;
