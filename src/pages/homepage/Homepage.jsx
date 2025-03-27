import HomepageBanner from '@/components/homepage/HomepageBanner';
import TrendingDiet from '@/components/homepage/TrendingDiet';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';

const Homepage = () => {
  return (
    <div className="mt-[104px]">
      <HomepageBanner />
      <WhyChooseUs />
      <TrendingDiet/>
    </div>
  );
};

export default Homepage;
