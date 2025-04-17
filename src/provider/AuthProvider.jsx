/* eslint-disable react-refresh/only-export-components */
import { useGetUserData } from '@/hooks/auth.hook.';
import useLocalStorage from '@/hooks/useLocalStorage';
import { createContext, useEffect, useState } from 'react';
export const AuthContextProvider = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken, clearToken] = useLocalStorage('token', null);
    const {
        data: userData = [],
        isLoading: loadingUserData,
        isFetching: fetchingUserData,
    } = useGetUserData(token);


    // Get user info:
    useEffect(() => {
        if (!token) {
            setUser(null);
            // setLoading(false);
            return;
        }

        if (userData?.data) {
            setUser(userData.data);
        } else {
            setUser(null);
        }

        if (loadingUserData) {
            setLoading(true);
        } else {
            setLoading(false);
        }

    }, [token, userData, fetchingUserData, loadingUserData]);

    // values to pass:
    const allValues = {
        loading,
        token,
        setToken,
        clearToken,
        user,
        loadingUserData,
        fetchingUserData,
        setUser,
        setLoading,
    };
    return (
        <AuthContextProvider.Provider value={allValues}>
            {children}
        </AuthContextProvider.Provider>
    );
};

export default AuthProvider;
