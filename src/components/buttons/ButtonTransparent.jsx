import { Link } from "react-router-dom";

const ButtonTransparent = ({ title, path, className }) => {
  return (
    <Link
      to={path}
      className={`text-textColor font-merriweather px-5 3xl:px-8 py-2 2xl:py-2.5 3xl:py-3 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white text-[15px] lg:text-base ${className}`}
    >
      {title}
    </Link>
  );
};

export default ButtonTransparent;
