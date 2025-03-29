import CommonHeroBanner from '@/components/common/CommonHeroBanner';
import banner from '../../assets/images/blog-details.jpg';
import { blogDetails } from '@/data/data';
import ShareYourRecipeSection from '@/components/homepage/ShareYourRecipeSection';
import RecipeBlogs from '@/components/homepage/RecipeBlogs';

const BlogDetails = () => {
  return (
    <div className="mt-[104px]">
      <CommonHeroBanner
        image={banner}
        title="Delicious Recipes & Tips for A Healthier You"
      />

      {/* contents */}
      <section className="max-w-[1010px] mx-auto mb-20 p-8">
        {/* details */}
        <div>
          <p className="text-textColor leading-[160%]">
            <span className="text-xl">Eating</span> healthy doesn’t have to be
            boring or restrictive! A well-balanced diet filled with nutritious,
            delicious meals can help you feel your best. Whether you’re looking
            to lose weight, boost energy, or simply improve your overall
            well-being, incorporating wholesome recipes and smart eating habits
            can make a big difference. In this blog, we’ll explore some tasty,
            nutritious recipes and essential tips to guide you on your journey
            to a healthier you.
          </p>
        </div>

        {/* Healthy Eating Tips */}
        <div className="mt-8">
          {/* title */}
          <h5 className="font-medium text-xl text-black leading-[160%]">
            Healthy Eating Tips
          </h5>
          {/* details */}
          <div className="mt-6 space-y-5">
            {blogDetails?.map((item) => (
              <div key={item?.id}>
                <h6 className="font-medium leading-[160%]">
                  {item?.id}. {item?.title}
                </h6>
                <p className="text-textColor leading-[160%]">
                  {item?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delicious & Nutritious Foods */}
        <div className="mt-8">
          {/* title */}
          <h5 className="font-medium text-xl text-black leading-[160%]">
            Delicious & Nutritious Foods
          </h5>

          {/* description */}
          <div className="mt-6 space-y-5 text-textColor leading-[160%]">
            <p>1. Avocado Toast with Poached Egg</p>
            <p>2. Quinoa & Chickpea Salad</p>
            <p>3. Berry Yogurt Smoothie</p>
          </div>
        </div>

        {/* contents */}
        <p className="mt-8 text-textColor leading-[160%]">
          Eating healthier doesn’t mean sacrificing flavor or satisfaction. By
          incorporating wholesome ingredients and simple cooking techniques, you
          can enjoy delicious meals while nourishing your body. Start with these
          recipes and tips, and make small changes that lead to lasting
          benefits. Here’s to a healthier, happier you!
        </p>
      </section>

      <ShareYourRecipeSection />

      <RecipeBlogs />
    </div>
  );
};

export default BlogDetails;
