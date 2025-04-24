import toast from 'react-hot-toast';
import useAuth from './useAuth';
import { useMutation } from '@tanstack/react-query';
import { AddMealPlanner, AddRecipe, AddReview, AddWishlist, DeleteMealPlan, EditMealPlanner, EditRecipe } from './cms.api';
import { useNavigate } from 'react-router-dom';

// Add reviews
export const useAddReview = (id) => {
    const { setLoading } = useAuth();
    
    return useMutation({
      mutationKey: ['add-review'],
      mutationFn: (payload) => AddReview(id, payload),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        toast.success('Review added Successfully');
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
      },
    });
};


// Add or Remove wishlist
export const useAddWishlist = (id) => {
    const { setLoading } = useAuth();
    
    return useMutation({
      mutationKey: ['add-wishlist'],
      mutationFn: () => AddWishlist(id),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        if(data.length === 0){
          setLoading(false);
          toast.error('Removed from favorites');
      }
       else{
          setLoading(false);
          toast.success('Added to favorites');
       }
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
      },
    });
};


// Add New Recipe
export const useAddRecipe = () => {
  const navigate = useNavigate()
  const { setLoading } = useAuth();
  
  return useMutation({
    mutationKey: ['add-recipe'],
    mutationFn: (payload) => AddRecipe(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success('Recipe added Successfully');
      navigate('/dashboard/dashboard-my-recipes')
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};


// Edit Recipe
export const useEditRecipe = (recipe_id) => {
  const navigate = useNavigate()
  const { setLoading } = useAuth();
  
  return useMutation({
    mutationKey: ['edit-recipe'],
    mutationFn: (payload) => EditRecipe(recipe_id, payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success('Recipe updated Successfully');
      navigate('/dashboard/dashboard-my-recipes')
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};



// Add Meal Planner
export const useAddMealPlanner = (recipe_id) => {
  const navigate = useNavigate()
  const { setLoading } = useAuth();
  
  return useMutation({
    mutationKey: ['add-meal-planner'],
    mutationFn: (payload) => AddMealPlanner(recipe_id, payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      if(data?.data?.length > 0) {
        setLoading(false);
        toast.success(data?.message);
        navigate('/dashboard/dashboard-meal-planner')
      }
      else{
        setLoading(false);
        toast.error(data?.message);
      }
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};


// Delete Meal Planner
export const useDeleteMealPlan = (meal_plan_id) => {
  const { setLoading } = useAuth();
  
  return useMutation({
    mutationKey: ['delete-meal-plan'],
    mutationFn: () => DeleteMealPlan(meal_plan_id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
        toast.success(data?.message);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};


// Edit Meal Planner
export const useEditMealPlanner = (item_id) => {
  const { setLoading } = useAuth();
  
  return useMutation({
    mutationKey: ['edit-meal-planner'],
    mutationFn: (payload) => EditMealPlanner(item_id, payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success('Recipe name changed successfully');
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};
