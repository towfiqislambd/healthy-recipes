import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContextProvider = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [token, setToken, clearToken] = useLocalStorage('token', null);
    console.log(loading)

    // values to pass:
    const allValues = {
        loading,
        setLoading,
        user,
        setUser,
        token,
        setToken,
        clearToken,
    };

    return (
        <AuthContextProvider.Provider value={allValues}>
            {children}
        </AuthContextProvider.Provider>
    );
};

export default AuthProvider;