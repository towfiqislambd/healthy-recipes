import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <p>Loading....</p>
    // return <Loader />;
  }
  if (token || user) return children;

  return <Navigate to="/auth/login" state={location?.pathname} replace />;
};

export default PrivateRoute;
