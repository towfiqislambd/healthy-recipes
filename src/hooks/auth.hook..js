import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetUserDataFunc,
  LoginFunc,
  LogOutFunc,
  OtpResendFunc,
  OtpVerifyFunc,
  RegisterFunc,
  ResetPasswordFunc,
  UpdatePasswordDashboardFunc,
  UpdateUserFunc,
  VerifyEmailFunc,
} from "@/hooks/auth.api";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

// get user data:
export const useGetUserData = token => {
  return useQuery({
    queryKey: ["user", token],
    queryFn: GetUserDataFunc,
    enabled: !!token, // Only run the query if token is truthy
    refetchInterval: 1000 * 60 * 60, // refetch every hour
  });
};

// register:
export const useRegister = () => {
  const { setLoading } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: payload => RegisterFunc(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: data => {
      setLoading(false);
      toast.success("Registration Successful");
      if (data?.token) {
        navigate("/auth/login");
      }
    },
    onError: err => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};

// login:
export const useLogin = () => {
  const { setLoading, setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: payload => LoginFunc(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: data => {
      setLoading(false);
      toast.success("Login Successful");
      if (data?.success) {
        if (data?.data?.token) {
          setToken(data?.data?.token);
          navigate((location?.state && location.state) || "/");
        }
      }
    },
    onError: err => {
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
    mutationKey: ["logout"],
    mutationFn: LogOutFunc,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      clearToken();
      navigate("/auth/login");
      setLoading(false);
      toast.success("User Logged out Successfully");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// verify email:
export const useVerifyEmail = () => {
  const { setLoading } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: payload => VerifyEmailFunc(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: data => {
      if (data?.email) {
        navigate("/auth/verify-otp", { state: { email: data.email } });
        setLoading(false);
        toast.success("Otp sent to your email address");
      }
    },
    onError: err => {
      setLoading(false);
      toast.error(err?.response?.data?.data?.email?.[0]);
    },
  });
};

// verify otp:
export const useVerifyOtp = reset => {
  const { setLoading } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: payload => OtpVerifyFunc(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: data => {
      if (data) {
        setLoading(false);
        toast.success("Otp verified successfully");
        navigate("/auth/reset-password", {
          state: { email: data.email, key: data?.password_reset_token },
        });
      }
    },
    onError: err => {
      setLoading(false);
      reset();
      toast.error(err?.response?.data?.message);
    },
  });
};

// otp resend:
export const useResendOtp = () => {
  const { setLoading } = useAuth();

  return useMutation({
    mutationKey: ["resend-otp"],
    mutationFn: payload => OtpResendFunc(payload),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("New OTP sent to your email");
    },
    onError: err => {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    },
  });
};

// reset password:
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: payload => ResetPasswordFunc(payload),
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/auth/login");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// update user mutation:
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: payload => UpdateUserFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("User Updated Successfully");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// update password dashboard::
export const useUserPasswordUpdate = () => {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: payload => UpdatePasswordDashboardFunc(payload),
    onSuccess: () => {
      toast.success("Password Updated Successfully");
    },
    onError: err => {
      toast.error(err?.response?.data?.message);
    },
  });
};
