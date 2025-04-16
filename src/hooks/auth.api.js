import { axiosPublic } from './useAxiosPublic';
import { axiosSecure } from './useAxiosSecure';

// register:
export const RegisterFunc = async (payload) => {
    const { data } = await axiosPublic.post('/api/users/register', payload);
    return data?.data;
};

// login:
export const LoginFunc = async (payload) => {
    const { data } = await axiosPublic.post('/api/users/login', payload);
    return data;
};

// logout:
export const LogOutFunc = async () => {
    const { data } = await axiosSecure.post('/api/users/logout');
    return data?.data;
};

// get user data:
export const GetUserDataFunc = async () => {
    const { data } = await axiosSecure.get('/api/users/data');
    return data;
};