import { CgProfile } from "react-icons/cg"
import LinkButton from "../../components/linkButton/LinkButton"
import { LuShoppingCart } from "react-icons/lu"
import { FaRegHeart } from "react-icons/fa"
import { Outlet, useNavigate } from "react-router-dom"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { logout } from "../../redux/features/auth/authSlice"
import toast, { Toaster } from "react-hot-toast"
import { isLoginpageShow } from "../../redux/features/LoginPage/loginSlice"
import auth from "../../hook/firebase"
import { signOut } from "firebase/auth"
import { RootState } from "../../redux/store"


const Customer = () => {
  const dispatch = useAppDispatch()
  const navigate =  useNavigate();
   const {changepassword} = useAppSelector((state:RootState) => state.loginisShow)

  const handlelogout = () => {
       dispatch(logout()) 
       signOut(auth)
       toast.success('logout successfully')
       navigate('/')
       dispatch(isLoginpageShow(true))
  }

  return (
    <div  className={`flex md:flex-row flex-col ${changepassword?"min-h-screen":''} `}>
      <Toaster/>
        <div className=" bg-[#f8faff] md:w-[20%] w-full px-2 py-6 shadow-xl  ">
        <h2 className="flex  mb-10 items-center gap-2 "> <span className="block font-medium text-xl">Sakib al</span> </h2>
         <ul className="space-y-1">
            <li><LinkButton path="/customer" title="Profile" icon={<CgProfile size={22} />} /></li>
            <li><LinkButton path="/customer/order" title="Order" icon={<LuShoppingCart size={22} />} /></li>
            <li><LinkButton path="/customer/whiteList" title="WhiteList" icon={<FaRegHeart size={22} />} /></li>
            <li onClick={handlelogout}><LinkButton  path="/admin/Logout" title="Logout" icon={<RiLogoutCircleRLine size={20} />} /></li>
            
            
         </ul>
        </div>
        <div className="md:w-[80%] w-full">
          <Outlet/>
        </div>
    </div>
  )
}

export default Customer
