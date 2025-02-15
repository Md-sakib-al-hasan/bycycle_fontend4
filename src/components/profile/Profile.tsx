import { Link } from "react-router-dom"

import ReactLoading from 'react-loading';
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleuserQuery } from "../../redux/features/user/userApi";
import { isChangepasswordShow } from "../../redux/features/LoginPage/loginSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../button/Button";


const Profile = () => {
     const dispatch = useAppDispatch();
     const currentuser = useAppSelector(selectCurrentUser);
     const   {data,isLoading} = useGetSingleuserQuery({email:currentuser?.useremail}) ;
     const user = data?.data;
  return (
  
    <div className="bg-[#eff0f4] relative">
        {
           isLoading &&  <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
        <div className=" container bg-[#eff0f4]  py-4">
     <h3 className=" text-xl font-medium mb-4">My Profile</h3>
     <div className="bg-white space-y-10 py-8 ">
     <div className=" px-11 text-sm space-y-10">
         <ul className="grid md:grid-cols-3 grid-cols-1 md:space-y-0 space-y-10 ">
             <li className="flex flex-col">
             <span className="text-lg">Full Name</span>
             <span className="text-sm">{user?.name}</span>
             </li>
             <li className="flex flex-col">
             <span  className="text-lg">Email Address</span>
             <span className="text-sm">{user?.email}</span>
             </li>
             <li className="flex flex-col">
             <span  className="text-lg">Mobile</span>
             <span className="text-sm">{user?.phone}</span>
             </li>
         </ul>
         <ul className="grid grid-cols-3">
             <li className="flex flex-col">
             <span  className="text-lg">Address</span>
             <span className="text-sm">{user?.address}</span>
             </li>
             <li className="flex flex-col">
             <span  className="text-lg">Gender</span>
             <span className="text-sm">{user?.gender}</span>
             </li>
            
         </ul>

     </div>
      <div className="px-10 space-y-4 xl:w-3/12 md:w-5/12 w-full">
      <Link  to={`/${user?.role === "customer"?"customer":"admin"}/editprofile`}> <Button  title="EDIT PROFILE"/> </Link>
     <span className="block" onClick={() => dispatch(isChangepasswordShow(true))}><Button title="CHANGE PASSWORD"/></span>
        
      </div>
     </div>
    </div>
    </div>
  )
}

export default Profile
