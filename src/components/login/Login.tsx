import {  FaGoogle } from "react-icons/fa";
import loginimage from "../../assets/login/about.jpg"
import { MdOutlineClear } from "react-icons/md";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { isLoginpageShow, isSignuppageShow } from "../../redux/features/LoginPage/loginSlice";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import auth from "../../hook/firebase";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { RiGithubLine } from "react-icons/ri";
import generateCustomEmail from "../../hook/generatecustomEmail";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TErrorResponse } from "../../types";


const Login = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate =  useNavigate();
    const [login] = useLoginMutation();
    const onSubmit = async (data:FieldValues) => {
        
         try {
          const res = await login(data).unwrap();
          const user = verifyToken(res.data.accessToken) as TUser;
          dispatch(setUser({ user: user, token: res.data.accessToken }));
          toast.success('Logged in');
          dispatch(isLoginpageShow(false));
            navigate(`/`);
          
          
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (err:any) {
          toast.error(err?.data?.message);
        }
        
      };
    
    const handlelogingoogle = async () => {
      try{
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        const newuser = result.user;
        
         //login user
       const res = await login({email:newuser?.email,password:newuser.displayName})
       if(res?.error){
        const error = res.error as FetchBaseQueryError;
          const errordata = error.data as TErrorResponse
            toast.error(errordata.message!)
          return 
       }
       const user = verifyToken(res.data.data.accessToken) as TUser;
       dispatch(setUser({ user: user, token: res.data.data.accessToken }));
       toast.success("Successfully logged in!");
       dispatch(isSignuppageShow(false))


       // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
       }catch(err:any) {
        toast.error(`Login failed: ${err.message}`); 
       }
    }
    const handleloginGithub = async () => {
      try{
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider)
        const newuser = result.user;
        const displayName = newuser?.displayName || ''
        const email = generateCustomEmail({displayName,uid:newuser.uid})
       //login user
       const res = await login({email,password:displayName})
       if(res?.error){
        const error = res.error as FetchBaseQueryError;
          const errordata = error.data as TErrorResponse
            toast.error(errordata.message!)
          return 
       }
       const user = verifyToken(res.data.data.accessToken) as TUser;
       dispatch(setUser({ user: user, token: res.data.data.accessToken }));
       toast.success("Successfully logged in!");
       dispatch(isSignuppageShow(false))

       // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
       }catch(err:any) {
        toast.error(`Login failed: ${err.message}`); 
       }
    }

  return (
    <div className="w-full absolute bottom-0 z-50  h-screen bg-black/20 flex justify-center items-center px-4">
        <Toaster/>
      <div className="max-w-sm  rounded-lg shadow-lg  relative bg-white">
         <span onClick={() =>  dispatch(isLoginpageShow(false))} className=" absolute text-sm font-semibold text-white right-[-16px] z-10 border-white border-[3px] bg-red-500 rounded-full p-[1px] top-[-12px]"><MdOutlineClear size={15} /></span>
        <div className="relative overflow-hidden rounded-lg">
        <img 
          className="w-full h-80 object-cover" 
          src={loginimage}
          alt="Placeholder"
        />
        <div className="absolute flex justify-center items-center  inset-0 bg-gradient-to-tr from-white/5 to-red-400/80">
          <form onSubmit={handleSubmit(onSubmit)} className="w-7/12 space-y-4 flex flex-col justify-center items-center">
            <h2 className="text-white text-2xl text-center font-semibold">Login</h2>
            <input  {...register("email", { required: "email is required" })}  placeholder="Enter your email" name="email" required type="email" className=" placeholder:text-sm focus:outline-none px-2 bg-[#e8f0fe] border-none py-3 w-full rounded-md" />
            {errors?.email && typeof errors?.email?.message === "string" && (<p>{errors?.email?.message}</p>)}
            <input  {...register("password", { required: "password is required" })}  placeholder="Enter your password" name="password" required type="password" className=" placeholder:text-sm focus:outline-none px-2 bg-[#e8f0fe] border-none py-3 w-full rounded-md" />
            {errors?.password && typeof errors?.password?.message === "string" && (<p>{errors?.password?.message}</p>)}
            <button className="bg-[#f23b3b] py-2 px-4 w-6/12 text-white rounded-sm ">Login</button>
          </form>
        </div>
        </div>
        <div className="p-4">
          <div className="mt-4 flex  justify-evenly">
            <button onClick={handleloginGithub} className="px-4 flex items-center gap-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">
            <RiGithubLine size={21} /> GitHub
            </button>
            <button onClick={handlelogingoogle} className="px-6 flex items-center gap-2 py-2 bg-[#1da1f2] text-white rounded-lg hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">
            <FaGoogle /> Google
            </button>
           
          </div>
        </div>
        <p onClick={() =>  {  dispatch(isSignuppageShow(true)); dispatch(isLoginpageShow(false))}} className="py-6 text-center hover:text-red-400 cursor-pointer">
            Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
