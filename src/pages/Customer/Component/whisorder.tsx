import { useForm } from "react-hook-form";
import { AiTwotoneShop } from "react-icons/ai";
import ReactLoading from 'react-loading';
import {  useGetAllWhiteListQuery } from "../../../redux/features/user/userApi";
import Pagination from "../../../components/pagination/Pagination";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { TWhiteList } from "../../../types";
import { Link } from "react-router-dom";



const Myorder = () => {
    const user = useAppSelector(selectCurrentUser)
    const { register, watch } = useForm();
    const searchValue = watch("search");
    const [page,setpate] = useState(1);
    const {data,isLoading} = useGetAllWhiteListQuery([{name:'email',value:user?.useremail},{name:"searchTerm",value:(searchValue === undefined?"":searchValue)},{name:"limit",value:3},{name:'page',value:page}]);


 
  return (
    <div className="bg-[#eff0f4] py-10 min-h-screen relative ">
        {
              isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
       <div className="container space-y-10">
       <div className="w-full bg-white p-3 shadow-md rounded-md">
            <form  className="space-x-3">
                <label>Show:</label>
                <input 
                    {...register("search")} 
                    className="py-1 border-red-400 border-[1px] rounded-sm" 
                    type="text" 
                />
            </form>    
           </div>
           <div  className="space-y-2">
             {
                data?.data?.result?.map((itme:TWhiteList) =>{
                    return <div key={itme._id} className="bg-white p-3  shadow-md rounded-md">
                    <div className="flex justify-between">
                    <div className="flex gap-2 items-center py-2">
                        <AiTwotoneShop size={20} className="text-red-400" />
                        <span>{itme.sellShopName}</span>
                    </div>
                   
                    </div>
                    <hr className="w-full h-1 shadow-md" />
                    <div className="flex gap-2 md:gap-5">
                    <img className="w-24 shadow-md h-24 object-cover" src={itme.img} alt="product image" />
                    <ul className="space-y-2 mt-2">
                        <li className="text-lg font-medium">{itme.productname}</li>
                        <li className="text-sm text-neutral-400 flex gap-4 "><span className="block">{itme.type}</span><span className="block">{itme.productId}</span></li>
                        <li className=" space-x-10">
                        <span className="md:hidden">${itme.price}</span>
                        
                        </li>
                    </ul>
                    <span className=" hidden md:block md:px-10 mt-2">${itme.price}</span>
                    </div>
                     <Link to={`/cart/${itme.productId}`}> <span className="block w-32  cursor-pointer bg-[#f23b3b] text-white rounded-lg hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200 ml-auto py-1   text-center">ordernow</span></Link>
                   </div>
                })
             }
              <Pagination totalpage={data?.data?.meta?.totalPage } pagenumber={setpate}/>
           </div>
       </div>
    </div>
  )
}

export default Myorder;
