import { ReactNode, useEffect, } from "react";
import {  useCurrentToken } from "../redux/features/auth/authSlice";
import {  useAppDispatch, useAppSelector } from "../redux/hooks";

import { Navigate } from "react-router-dom";
import { isLoginpageShow } from "../redux/features/LoginPage/loginSlice";


const Protected = ({children}:{children:ReactNode}) => {
      const dispatch = useAppDispatch();
      
      const token = useAppSelector(useCurrentToken);
      useEffect(() => {
          if (!token) {
            dispatch(isLoginpageShow(true));
          } 
        }, [token, dispatch]);
      if (!token) return  <Navigate to="/" replace />;
  return children
}

export default Protected
