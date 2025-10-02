import React from "react";
import { cn } from "@/lib/utils";
import { ButtonArrowSvg } from "@/Components/Svg/SvgContainer";

type ButtonProps = {
  text: string;
  icon?: boolean;
  className?: string;
  animation?: boolean;
  onClick?: () => void;
  type?: "reset" | "submit";
  variant?: "primary_btn" | "auth_btn";
};

const Button = ({
  type,
  icon = false,
  text,
  onClick,
  className,
  animation = false,
  variant = "primary_btn",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-aos={animation ? "fade-up" : undefined}
      className={cn(
        variant === "primary_btn" &&
          "bg-primary-orange font-medium text-white rounded-full inline-flex items-center justify-center px-3 xl:px-5 3xl:px-8 py-1 xl:py-2 3xl:py-3 border border-primary hover:bg-transparent duration-300 transition-all group hover:text-primary text-[15px] lg:text-base",
        variant === "auth_btn" && "text-green-500",
        className
      )}
      {...props}
    >
      {text}
      {icon && <ButtonArrowSvg />}
    </button>
  );
};

export default Button;
