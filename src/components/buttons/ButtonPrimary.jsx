import { Link } from "react-router-dom";
import { TopArrowButtonSvg } from "../svg-container/SvgContainer";

const ButtonPrimary = ({ title, path, svg }) => {
  return (
    <Link
      to={path}
      className="bg-primary font-medium text-white rounded-full inline-flex items-center justify-center 3xl:px-8 px-4 lg:px-5 3xl:py-3 py-1 lg:py-2 border border-primary hover:bg-transparent duration-300 transition-all group hover:text-primary"
    >
      <span>{title}</span>
      {svg && <TopArrowButtonSvg />}
    </Link>
  );
};

export default ButtonPrimary;
