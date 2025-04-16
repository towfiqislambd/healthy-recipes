import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { GetUserDataFunc, LoginFunc, LogOutFunc, RegisterFunc } from "./auth.api";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

// Register:
export const useRegister = () => {
    const { setLoading } = useAuth();
    const navigate = useNavigate();
    
    return useMutation({
      mutationKey: ['register'],
      mutationFn: (payload) => RegisterFunc(payload),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        setLoading(false);
        toast.success('Registration Successful');
        if (data?.token) {
          navigate('/auth/login');
        }
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };


// Login:
export const useLogin = () => {
    const { setLoading, setToken } = useAuth();
    const navigate = useNavigate();

    return useMutation({
      mutationKey: ['login'],
      mutationFn: (payload) => LoginFunc(payload),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        setLoading(false);
        toast.success('Login Successful');
        if (data?.success) {
          if (data?.data?.token) {
            setToken(data?.data?.token);
            navigate('/');
          }
        }
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };


// logout:
export const useLogOut = () => {
  const { setLoading, clearToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: LogOutFunc,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      clearToken();
      navigate('/auth/login');
      setLoading(false);
      toast.success('User Logged out Successfully');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};


// get user data:
export const useGetUserData = (token) => {
  return useQuery({
    queryKey: ['user', token],
    queryFn: GetUserDataFunc,
    enabled: !!token, // Only run the query if token is truthy
    refetchInterval: 1000 * 60 * 60, // refetch every hour
  });
};