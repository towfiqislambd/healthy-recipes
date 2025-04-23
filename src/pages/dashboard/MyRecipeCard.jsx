import { Link } from 'react-router-dom';
// import { FiEdit } from "react-icons/fi";
// import useAuth from '@/hooks/useAuth';
// import toast from 'react-hot-toast';
// import { useAddWishlist } from '@/hooks/cms.mutations';
import { StarSvg, FireSvg, LoveSvg, RecipeBookSvg } from '@/components/svg-container/SvgContainer';

const MyRecipeCard = ({ item }) => {
    // isMyRecipe (it is props)
    // const { user } = useAuth();
    // const navigate = useNavigate();
    // const { mutateAsync: wishlistMutation } = useAddWishlist(item?.id);

    // Function to handle wishlist button click
    // const handleWishlistClick = (e) => {
    //     e.stopPropagation(); // Prevents the click event from bubbling up
    //     e.preventDefault(); // Prevents the default link navigation

    //     if (user) {
    //         wishlistMutation()
    //     }
    //     else {
    //         toast.error('Please login first')
    //         navigate('/auth/login')
    //     }
    // };

    return (
        <Link
            to={`/my-recipe-details/${item.id}`}
            className={`bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.04)] pb-1 4xl:pb-5 flex flex-col justify-between group rounded-2xl`}
        >
            <div className="relative">
                {/* image and overlay */}
                <div className="block">
                    <div className="h-[300px] lg:h-[320px] 2xl:h-[350px] w-full relative rounded-sm overflow-hidden">
                        <img
                            className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all"
                            src={`${import.meta.env.VITE_SITE_URL}/${item?.recipe_image}`}
                            alt="image"
                        />
                        {/* Overlay with Linear Gradient */}
                        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
                    </div>
                </div>
                {/* {
                    isMyRecipe ?
                        <button
                            onClick={handleWishlistClick}
                            className={`absolute size-10 z-20 flex items-center justify-center top-4 right-4 border border-[#CB4242] rounded-full cursor-pointer ${item?.is_wishlisted ? 'bg-[#CB4242]' : 'bg-[#FFE3E3]'
                                }`}
                        >
                            <LoveSvg isFavorite={item?.is_wishlisted} />
                        </button>
                        :
                        <button
                            onClick={e => e.stopPropagation()}
                            className='absolute size-10 z-20 flex items-center justify-center top-4 right-4 border border-[#CB4242] rounded-full cursor-pointer'
                        >
                            <FiEdit className='text-lg' />
                        </button>
                } */}

                {/* type */}
                <div className="absolute top-3 left-3">
                    <p className="px-2 4xl:px-3 py-1 4xl:py-1.5 rounded-sm bg-white/50 text-black text-sm">
                        <span>
                            {
                                `${item?.library_name || item?.recipe_library?.diet_name}
                                | 
                                ${item?.category_name || item?.category?.category_name}`
                            }
                        </span>
                    </p>
                </div>
            </div>

            {/* description */}
            <div className="py-3 4xl:py-4 px-3 text-wrap border-b border-dashed border-black">
                <h5 className="text-lg 4xl:text-xl font-bold font-merriweather text-black truncate">
                    {item?.recipe_name}
                </h5>
                <div className="mt-2 4xl:mt-4 space-y-1 4xl:space-y-2">
                    <div className="flex flex-wrap gap-2">
                        <div className="flex-shrink-0">
                            <RecipeBookSvg />
                        </div>
                        <p className="text-textColor text-[15px] xl:text-base font-medium">
                            {item?.serving_number} servings | {item?.preparation_time} min needed
                        </p>
                    </div>
                    <div>
                        <p className="text-textColor font-medium text-[15px] xl:text-base">
                            For: <span className="capitalize"> {item?.age_group}</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-textColor font-medium text-[15px] xl:text-base">
                            {
                                `${item?.total_ingredients} ingredients | ${item?.recipe_creator}`
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* stats */}
            <div className="px-5 py-3 4xl:py-5 w-full flex items-center justify-between">
                {/* views */}
                <div className="flex items-center gap-1">
                    <FireSvg />
                    <span className="text-textColor text-sm font-medium">{item?.views}</span>
                </div>

                {/* reviews */}
                <div className="flex items-center gap-1">
                    <StarSvg />
                    <span className="text-textColor text-sm font-medium">
                        {item?.average_rating}
                    </span>
                </div>
            </div>
        </Link >
    );
};

export default MyRecipeCard;
