import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginFunc, RegisterFunc } from "./auth.api";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

// register::
export const useRegister = () => {
    // const { setLoading } = useAuth();
    const navigate = useNavigate();
    return useMutation({
      mutationKey: ['register'],
      mutationFn: (payload) => RegisterFunc(payload),
      onMutate: () => {
        // setLoading(true);
      },
      onSuccess: (data) => {
        // setLoading(false);
        toast.success('Registration Successful');
        if (data?.token) {
          navigate('/auth/login');
        }
      },
      onError: (err) => {
        // setLoading(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };


// login::
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
        console.log(data);
        if (data?.success) {
          if (data?.data?.token) {
            setToken(data?.data?.token);
            navigate('/');
          }
        }
        setLoading(false);
        toast.success('Login Successful');
      },
      onError: (err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      },
    });
  };