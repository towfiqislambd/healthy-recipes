import { Link } from 'react-router-dom';

const ButtonTransparent = ({ title }) => {
  return (
    <Link className="text-textColor font-merriweather px-8 py-3 border rounded-full border-primary hover:bg-primary transition-all duration-300 hover:text-white">
      {title}
    </Link>
  );
};

export default ButtonTransparent;
