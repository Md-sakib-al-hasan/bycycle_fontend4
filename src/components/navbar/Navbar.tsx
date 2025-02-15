
import logo from "../../assets/logo.png"
import { AiOutlineUser } from "react-icons/ai"
import { MdOutlineShoppingCart } from "react-icons/md"
import { IoMenu } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { isLoginpageShow } from "../../redux/features/LoginPage/loginSlice"
import { Link } from "react-router-dom"
import { selectCurrentUser } from "../../redux/features/auth/authSlice"

const Navlist = ["Home","Shop","About","Contact Us"]

const Navbar = () => {
    const dispatch = useAppDispatch()
    const user  = useAppSelector(selectCurrentUser)
  return (
    <div className="container">
       <nav className="flex md:flex-row flex-col justify-between items-center shadow-sm py-3">
         <img  src={logo} alt="logo" />
         
         <ul className="flex md:gap-8 gap-5">
         <div className="md:hidden relative block group ">
            <span className="hidden bg-white rounded-sm top-6 py-2 px-4 absolute group-hover:block">
               <ul>{
                 Navlist?.map((item,index) => <li className="hover:text-red-400 cursor-pointer" key={index}><Link to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, '_')}`}>{item}</Link></li>)
                }</ul>
            </span>
            <IoMenu size={22}/>
         </div>
         <div className="md:flex gap-8 hidden">{
            Navlist?.map((item,index) => <li className="hover:text-red-400 cursor-pointer" key={index}><Link to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, '_')}`}>{item}</Link></li>)
         }</div>
         <li className="flex gap-6 items-end">
           <span className="hover:text-red-400"><Link to="/shop"> <MdOutlineShoppingCart size={22} /></Link></span>
            <span onClick={() =>  dispatch(isLoginpageShow(true))} className="hover:text-red-400 group relative">
              {user?.useremail?<Link to={`/${user?.role === "customer"?"customer":"admin"}`}><AiOutlineUser size={22} /></Link>:<AiOutlineUser size={22} />}
              
            </span>
         </li>
         </ul>
       </nav>
    </div>
  )
}

export default Navbar
