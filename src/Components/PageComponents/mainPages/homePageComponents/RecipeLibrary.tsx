import React from "react";
import Button from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Heading from "@/Components/Common/Heading";
import RecipeLibraryCard from "@/Components/Cards/RecipeLibraryCard";

type recipeLibraryItem = {
  id: number;
  image: string;
  diet_name: string;
  recipes_count: number;
};

interface RecipeLibraryProps {
  data: recipeLibraryItem[];
}

const RecipeLibrary = ({ data }: RecipeLibraryProps) => {
  return (
    <section className="bg-[#FCFCFC] py-7 md:py-10 2xl:py-16 3xl:py-24">
      <Container>
        <div className="lg:px-3 xl:px-5 2xl:px-10 3xl:px-0">
          <Heading text="Recipe Library" />

          <div className="mt-2 md:-mt-8">
            {/* See All Btn */}
            <div className="w-full flex items-center justify-center md:justify-end mt-5 sm:mt-0 px-2 sm:px-0">
              <Button
                text="See all"
                path="/recipe-library"
                variant="secondary_btn"
              />
            </div>

            {/* Recipe Library Cards */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-5 pt-8">
              {data?.slice(0, 4)?.map((item, idx) => (
                <RecipeLibraryCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RecipeLibrary;
