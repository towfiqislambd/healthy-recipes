import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddMealPlanner,
  AddRecipe,
  AddReview,
  AddWishlist,
  DeleteMealPlan,
  EditMealPlanner,
  EditRecipe,
} from "@/hooks/cms.api";
import { useNavigate } from "react-router-dom";

// Add reviews
export const useAddReview = id => {
  return useMutation({
    mutationKey: ["add-review"],
    mutationFn: payload => AddReview(id, payload),
    onSuccess: () => {
      toast.success("Review added Successfully");
    },
    onError: err => {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
  });
};

// Add or Remove wishlist
export const useAddWishlist = id => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-wishlist"],
    mutationFn: () => AddWishlist(id),
    onSuccess: data => {
      queryClient.invalidateQueries(["get-wishlists"]);
      if (data.length === 0) {
        toast.success("Removed from favorites");
      } else {
        toast.success("Added to favorites");
      }
    },
    onError: err => {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    },
  });
};

// Add New Recipe
export const useAddRecipe = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-recipe"],
    mutationFn: payload => AddRecipe(payload),
    onSuccess: () => {
      toast.success("Recipe added Successfully");
      navigate("/dashboard/dashboard-my-recipes");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Edit Recipe
export const useEditRecipe = recipe_id => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["edit-recipe"],
    mutationFn: payload => EditRecipe(recipe_id, payload),
    onSuccess: () => {
      toast.success("Recipe updated Successfully");
      navigate("/dashboard/dashboard-my-recipes");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Add Meal Planner
export const useAddMealPlanner = recipe_id => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-meal-planner"],
    mutationFn: payload => AddMealPlanner(recipe_id, payload),
    onSuccess: data => {
      if (data?.data?.meals?.length > 0) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["meal-planner-table"]);
        navigate("/dashboard/dashboard-meal-planner");
      } else {
        toast.error(data?.message);
      }
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Delete Meal Planner
export const useDeleteMealPlan = meal_plan_id => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-meal-plan"],
    mutationFn: () => DeleteMealPlan(meal_plan_id),
    onSuccess: data => {
      toast.success(data?.message);
      queryClient.invalidateQueries(["meal-planner-table"]);
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Edit Meal Planner
export const useEditMealPlanner = item_id => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-meal-planner"],
    mutationFn: payload => EditMealPlanner(item_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["meal-planner-table"]);
      toast.success("Recipe name changed successfully");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};
