export type recipeItem = {
  id: number;
  recipe_name: string;
  recipe_image: string;
  age_group: string;
  serving_number?: number;
  preparation_time?: number;
  cooking_time?: number;
  recipe_creator?: string;
  library_name?: string;
  tag_names?: any;
  total_ingredients?: number;
  views?: number;
  is_wishlisted?: boolean;
  average_rating?: string;
  reviews_avg?: string;
  category_name?: string;
  category?: {
    category_name: string;
  };
  recipe_library?: {
    diet_name: string;
  };
};
