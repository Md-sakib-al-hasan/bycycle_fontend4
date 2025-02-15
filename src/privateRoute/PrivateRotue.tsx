import { Navigate } from "react-router-dom";
import { logout, TUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { isLoginpageShow } from "../redux/features/LoginPage/loginSlice";
import { ReactNode, useEffect, useState } from "react";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const PrivateRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (!token) {
      dispatch(isLoginpageShow(true));
    } else {
      const verifiedUser = verifyToken(token) as TUser;
      setUser(verifiedUser);
    }
  }, [token, dispatch]);


  useEffect(() => {
    if (user && role !== undefined && role !== user.role) {
      if (role === "admin" && user.role === "superAdmin") {
        return; 
      }
      dispatch(logout());
      dispatch(isLoginpageShow(true));
    }
  }, [user, role, dispatch]);

  

  if (!token) return <Navigate to="/" replace />;
  if (role !== undefined && user && role !== user.role){
    // eslint-disable-next-line no-empty
    if (role === "admin" && user.role === "superAdmin") {}else{
      return <Navigate to="/" replace />;
    }
  } 

  return children;
};

export default PrivateRoute;
