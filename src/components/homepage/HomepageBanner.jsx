import ButtonPrimary from "../buttons/ButtonPrimary";
import banner1 from "../../assets/images/banner-1.jpg";
import banner2 from "../../assets/images/banner-2.jpg";
import banner3 from "../../assets/images/banner-3.jpg";
import banner4 from "../../assets/images/banner-4.jpg";

const HomepageBanner = () => {
  return (
    <section className="sm:py-[68px] pt-16 bg-[#F6F5F2]">
      <div className="container flex flex-col md:flex-row items-center md:gap-16 gap-10">
        {/* left side */}
        <div className="md:space-y-10 space-y-5 w-full px-6 md:px-0">
          {/* Details */}
          <div className="space-y-5">
            <h1 className="md:max-w-[740px] w-full font-merriweather text-3xl md:text-[56px] font-bold leading-[135%] text-black">
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
          <ButtonPrimary path="/recipe-library" title="Explore all recipes" svg={true} />
        </div>

        {/* right side */}
        <div className="w-fit space-y-5">
          {/* top images */}
          <div className="w-full flex flex-col md:flex-row items-end gap-5 md:px-10">
            <div className="md:h-[320px] h-[230px] md:w-[300px] w-full relative overflow-hidden rounded-lg">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner1}
                alt="banner"
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>

            <div className="md:h-[340px] h-[230px] md:w-[320px] w-full overflow-hidden rounded-lg relative">
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
          <div className="w-full flex flex-col md:flex-row gap-5">
            <div className="md:h-[390px] h-[230px] md:w-[365px] w-full relative overflow-hidden rounded-lg">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={banner3}
                alt=""
              />
              {/* Overlay with Linear Gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/30 to-black/30"></div>
            </div>
            <div className="md:h-[360px] h-[230px] md:w-[340px] w-full relative rounded-lg overflow-hidden">
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
