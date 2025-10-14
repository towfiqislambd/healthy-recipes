"use client";
import useAuth from "@/Hooks/useAuth";
import useClientApi from "@/Hooks/useClientApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// Get User Data
export const useGetUserData = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/api/users/data",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60, // refetch every hour
    },
  });
};

// Registration
export const useRegister = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["register"],
    endpoint: "/api/users/register",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/auth/login");
      }
    },
  });
};

// Login
export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/api/users/login",
    onSuccess: (data: any) => {
      if (data?.success) {
        setToken(data?.data?.token);
        toast.success(data?.message);
        router.push("/dashboard/overview");
      }
    },
  });
};

// Logout
export const useLogout = () => {
  const router = useRouter();
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    isPrivate: true,
    endpoint: "/api/users/logout",
    onSuccess: (data: any) => {
      if (data?.success) {
        clearToken();
        toast.success(data?.message);
        router.replace("/auth/login");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Verify Email
export const useVerifyEmail = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["verify-email"],
    endpoint: "/api/users/login/email-verify",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push(`/auth/verify-otp/${data?.data?.email}`);
      }
    },
  });
};

// Verify OTP
export const useVerifyOTP = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["verify-otp"],
    endpoint: "/api/users/login/otp-verify",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push(
          `/auth/reset-password?email=${encodeURIComponent(
            data?.data?.email
          )}&key=${data?.data?.password_reset_token}`
        );
      }
    },
  });
};

// Resend OTP
export const useResendOTP = () => {
  return useClientApi({
    method: "post",
    key: ["otp-resend"],
    endpoint: "/api/users/login/otp-resend",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      }
    },
  });
};

// Reset Password
export const useResetPassword = () => {
  const router = useRouter();
  return useClientApi({
    method: "post",
    key: ["reset-password"],
    endpoint: "/api/users/login/reset-password",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/auth/login");
      }
    },
  });
};

// Google Login:
export const useGoogleLoginFunc = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["google-login"],
    endpoint: "/api/social-login",
    onSuccess: (data: any) => {
      if (data?.success) {
        setToken(data?.data?.token);
        toast.success(data?.message);
        router.push("/dashboard/resume-builder");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Change Password
export const useChangePassword = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["change-password"],
    endpoint: "/api/users/password/change",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      }
    },
  });
};

// Update User Data
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useClientApi({
    method: "post",
    key: ["update-user"],
    isPrivate: true,
    endpoint: "/api/users/data/update",
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries("user" as any);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};
