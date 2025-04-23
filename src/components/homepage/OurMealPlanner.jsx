import ButtonPrimary from "../buttons/ButtonPrimary";
import parse from 'html-react-parser';

const OurMealPlanner = ({ data }) => {
  return (
    <section className="py-7 md:py-12 2xl:py-16 3xl:py-20 bg-[#FCFCFC]">
      {
        data?.map((item, idx) => <div key={idx} className="container">
          <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-12 3xl:gap-32 lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
            {/* left contents */}
            <div className="flex-1">
              <h4 className="font-merriweather text-2xl 2xl:text-3xl 3xl:text-[40px] leading-[140%] font-bold">{item?.title}</h4>

              {/* description */}
              <div className="space-y-3 2xl:space-y-6 mt-3 2xl:mt-5 3xl:mt-8 text-textColor leading-[150%]">
                {typeof item?.description === 'string' ? parse(item?.description) : item?.description}
              </div>

              {/* explore more */}
              <div className="2xl:mt-10 mt-5">
                <ButtonPrimary title={item?.btn_text} />
              </div>
            </div>
            {/* right contents */}
            <div className="bg-[#FDE0B8] px-6 sm:px-12 sm:py-14 py-7 rounded-lg flex-1 group overflow-hidden w-full">
              <div>
                <img
                  className="group-hover:scale-105 transition-all duration-500 rounded-md w-full"
                  src={`${import.meta.env.VITE_SITE_URL}/${item?.image}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>)
      }
    </section>
  );
};

export default OurMealPlanner;
