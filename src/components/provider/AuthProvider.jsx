import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContextProvider = createContext(null);

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken, clearToken] = useLocalStorage('token', null);

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