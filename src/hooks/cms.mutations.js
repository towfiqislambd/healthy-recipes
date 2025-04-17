import toast from 'react-hot-toast';
import useAuth from './useAuth';
import { useMutation } from '@tanstack/react-query';
import { AddReview } from './cms.api';

// Add reviews
export const useAddReview = (id) => {
    const { setLoading } = useAuth();
    
    return useMutation({
      mutationKey: ['add-recipe'],
      mutationFn: (payload) => AddReview(id, payload),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        toast.success('Review added Successfully');
      },
      onError: () => {
        setLoading(false);
        toast.error('Something went wrong. Please try again.');
      },
    });
  };