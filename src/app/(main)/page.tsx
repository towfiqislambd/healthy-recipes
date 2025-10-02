import Hero from "@/Components/PageComponents/mainPages/homePageComponents/Hero";
import { getHeroData } from "@/Hooks/api/cms_api";

const Page = async () => {
  const heroData = await getHeroData();
  return (
    <>
      <Hero data={heroData?.data} />
    </>
  );
};

export default Page;
