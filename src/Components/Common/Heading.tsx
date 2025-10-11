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
        "font-merriweather text-2xl 2xl:text-3xl 3xl:text-4xl leading-[140%] font-semibold text-center",
        className
      )}
      {...props}
    >
      {text}
    </Tag>
  );
};

export default Heading;
