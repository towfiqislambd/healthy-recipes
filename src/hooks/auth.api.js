import { axiosPublic } from './useAxiosPublic';
// import { axiosSecure } from './useAxiosSecure';

// register
export const RegisterFunc = async (payload) => {
    const { data } = await axiosPublic.post('/api/users/register', payload);
    return data?.data;
};

// login::
export const LoginFunc = async (payload) => {
    const { data } = await axiosPublic.post('/api/users/login', payload);
    return data;
};