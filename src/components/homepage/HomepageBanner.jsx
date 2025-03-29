import ButtonPrimary from "../buttons/ButtonPrimary";
import banner1 from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";
import banner4 from "../../assets/images/banner-4.jpg";

const HomepageBanner = () => {
  return (
    <section className="py-[68px] bg-[#F6F5F2]">
      <div className="container flex items-center gap-16">
        {/* left side */}
        <div className="space-y-10 w-full">
          {/* Details */}
          <div className="space-y-5">
            <h1 className="max-w-[740px] font-merriweather text-[56px] font-bold leading-[135%] text-black">
              Baby Bites to Golden Delights - Healthy
              <span className="text-primary ml-4">Recipes & Tips</span> for All
              thys
            </h1>
            <p className="text-textColor leading-[150%] max-w-[740px] ">
              Discover delicious, age-appropriate recipes tailored to every
              stage of life. Eat healthier, plan smarter, and enjoy meals that
              fit your lifestyle!
            </p>
          </div>

          {/* button */}
          <ButtonPrimary title="Explore all recipes" svg={true} />
        </div>

        {/* right side */}
        <div className="w-fit space-y-5">
          {/* top images */}
          <div className="w-full flex items-end gap-5 px-10">
            <div className="h-[320px] w-[300px] relative overflow-hidden rounded-lg">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner1}
                alt="banner"
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>

            <div className="h-[340px] w-[320px] overflow-hidden rounded-lg relative">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner2}
                alt=""
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>
          </div>

          {/* bottom images */}
          <div className="w-full flex gap-5">
            <div className="h-[390px] w-[365px] relative overflow-hidden rounded-lg">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner3}
                alt=""
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>
            <div className="h-[360px] w-[340px] relative rounded-lg overflow-hidden">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner4}
                alt=""
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageBanner;
