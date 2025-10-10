import React from "react";
import { cn } from "@/lib/utils";
import { ButtonArrowSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";

type ButtonProps = {
  text: string;
  path?: any;
  icon?: boolean;
  className?: string;
  animation?: boolean;
  onClick?: () => void;
  type?: "reset" | "submit";
  variant?: "primary_btn" | "secondary_btn" | "auth_btn";
};

const Button = ({
  type,
  path,
  icon = false,
  text,
  onClick,
  className,
  animation = false,
  variant = "primary_btn",
  ...props
}: ButtonProps) => {
  return (
    <Link
      href={path}
      type={type}
      onClick={onClick}
      data-aos={animation ? "fade-up" : undefined}
      className={cn(
        variant === "primary_btn" &&
          "bg-primary-orange font-medium text-white rounded-full inline-flex items-center justify-center px-3 xl:px-5 3xl:px-8 py-1 xl:py-2 3xl:py-3 border border-primary-orange hover:bg-transparent duration-500 transition-all group hover:text-primary-orange text-[15px] lg:text-base",

        variant === "secondary_btn" &&
          "text-primary-orange font-merriweather md:px-6 px-3 md:py-3 py-1 border rounded-full border-primary-orange hover:bg-primary-orange transition-all duration-300 hover:text-white",

        variant === "auth_btn" &&
          "leading-[160%] font-semibold text-white tracking-[-0.096px] border-primary-orange w-full border bg-primary-orange rounded-full text-center py-3 hover:bg-transparent hover:text-primary-orange  transition-all duration-300 h-[50px] flex items-center justify-center",
        className
      )}
      {...props}
    >
      {text}
      {icon && <ButtonArrowSvg />}
    </Link>
  );
};

export default Button;
