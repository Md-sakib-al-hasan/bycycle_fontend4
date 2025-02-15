
import Login from "../../components/login/Login";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import Sigine from "../../components/sigine/Sigine";
import { Suspense } from "react";
import Footer from "../../components/Footer/Footer";
import LaodingCycle from "../../components/loadingState/LoadingCycle";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";


const Main = () => {
   const {login,signu} = useAppSelector((state:RootState) => state.loginisShow)
   const user  = useAppSelector(selectCurrentUser)

  
  return (
     <Suspense fallback={<LaodingCycle/>}  >
       <div className={`${login && !user?.useremail?'h-screen overflow-hidden':''} ${signu  &&  !user?.useremail?'h-screen overflow-hidden':''}`}>
      {login && !user?.useremail &&  <Login/>}
      {signu  &&  !user?.useremail &&  <Sigine/>}
      <Navbar/> 
       <Suspense fallback={<LaodingCycle/>} >
       <Outlet/>
      </Suspense>

      <Footer/>
    </div>
     </Suspense>
  )
}

export default Main;
