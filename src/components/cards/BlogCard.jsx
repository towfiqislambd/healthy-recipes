import avatar from '../../assets/images/avatar-1.jpg';
import { Link } from 'react-router-dom';
import { ArrowTopRightSvg } from '../svg-container/SvgContainer';

const BlogCard = ({ data }) => {
  return (
    <Link
      to={`/blog/${data?.id}`}
      className="bg-white block rounded-lg shadow-[0px_0px_8px_0px_rgba(0,0,0,0.06)] px-3 pt-3 pb-8 group"
    >
      {/* image */}
      <div>
        <div className="w-full h-[250px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover rounded-sm group-hover:scale-110 transition-all duration-300"
            src={data?.image}
            alt=""
          />
        </div>
      </div>
      {/* contents */}
      <div className="mt-6">
        <div className="w-full flex items-center justify-between">
          <h5 className="leading-[20px] font-medium text-sm text-primary">
            Keto diet | {data?.time}.
          </h5>
          <p className="leading-[20px] font-medium text-sm text-primary">
            {data?.date}
          </p>
        </div>
        {/* title */}
        <div className="space-y-3">
          <h4 className="text-lg 2xl:text-xl font-bold leading-[160%] font-merriweather text-black">
            {data?.title}
          </h4>
          <p className="text-textColor leading-[150%] h-14">{data?.subtitle}</p>
        </div>

        {/* user info */}
        <div className="sm:mt-12 mt-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                className="h-full w-full object-cover rounded-full"
                src={avatar}
                alt=""
              />
            </div>
            <div>
              <h5 className="text-black font-medium leading-[140%] text-sm">
                Olivia Rhye
              </h5>
              <p className="text-textColor text-sm leading-[140%]">
                20 Jan 2022
              </p>
            </div>
          </div>

          <div className="hover:scale-110 transition-all duration-300 block">
            <ArrowTopRightSvg />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
