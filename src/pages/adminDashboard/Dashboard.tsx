import { RiLogoutCircleRLine, RiSettingsLine } from "react-icons/ri"
import LinkButton from "../../components/linkButton/LinkButton"
import { IoHomeOutline } from "react-icons/io5"
import { SiHackthebox } from "react-icons/si"
import { LuShoppingCart, LuSquareUser } from "react-icons/lu"
import { CgProfile } from "react-icons/cg"
import { MdOutlineReviews } from "react-icons/md"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/features/auth/authSlice"

import { isLoginpageShow } from "../../redux/features/LoginPage/loginSlice"

import { Toaster,toast } from "react-hot-toast"


const Dashboard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(logout()) 
    toast.success('logout successfully')
    navigate('/')
    dispatch(isLoginpageShow(true))
}

  return (
    <div className="mt-5 flex md:flex-row flex-col gap-8  ">
      <Toaster/>
      <div className="bg-[#f8faff] md:w-[20%] p-6 shadow-xl  ">
         <h2 className="flex  mb-10 items-center gap-2 "><RiSettingsLine size={26} /> <span className="block font-medium text-xl">DashBoard</span> </h2>
         <ul className="space-y-1">
            <li><LinkButton path="/admin" title="Home" icon={<IoHomeOutline size={24} />} /></li>
            <li><LinkButton path="/admin/Product" title="Product" icon={<SiHackthebox size={22} />} /></li>
            <li><LinkButton path="/admin/Order" title="Order" icon={<LuShoppingCart size={22} />} /></li>
            <li><LinkButton path="/admin/User" title="User" icon={<LuSquareUser size={24} />} /></li>
            <li><LinkButton path="/admin/Reviews" title="Reviews" icon={<MdOutlineReviews size={22} />} /></li>
            <li><LinkButton path="/admin/Profile" title="Profile" icon={<CgProfile size={22} />} /></li>
            <li onClick={handlelogout}><LinkButton path="/admin" title="Logout" icon={<RiLogoutCircleRLine size={20} />} /></li>
         </ul>
      </div>
      <div className="md:w-[80%] ">
          <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
