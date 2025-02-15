import { FaBox, FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { LuPackage } from "react-icons/lu";
import Pagination from "../../../components/pagination/Pagination";
import { useForm } from "react-hook-form";
import { useState } from "react";

import ReactLoading from 'react-loading';
import { TOrder } from "../../../types";
import { useGetAllOrderQuery } from "../../../redux/features/order/orderApi";
import { useGetTodayorderQuery } from "../../../redux/features/user/userApi";



const Order = () => {
     const [page,setpage] = useState(1)
     const [sort,setSort] = useState("-createdAt")
       const { register, watch } = useForm();
         const searchValue = watch("search");
         const {data,isLoading} =  useGetAllOrderQuery([{name:"sort",value:sort},{name:"searchTerm",value:(searchValue === undefined?"":searchValue)},{name:"limit",value:8},{name:'page',value:page},], { pollingInterval: 10 * 60 * 1000 })
         const {data:pendingorder,} =  useGetAllOrderQuery([{name:"paidStatus",value:"canceled"},{name:"paidStatus",value:"failed"}], { pollingInterval: 10 * 60 * 1000 })
         const {data:today} =  useGetTodayorderQuery(null, { pollingInterval: 10 * 60 * 1000 })
  return (
    <div>
      <ul className="grid md:grid-cols-3 xl:gap-10 gap-5">
         {
          isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
          }
      <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-blue-400 text-white px-3 rounded-md py-3">
              <FaShoppingCart size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">Today Order</h4>
              <span className="lg:text-3xl text-2xl font-semibold">
                <span className="hover:text-red-400 cursor-pointer">
                    {today?.data}
                </span>
              </span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-blue-400 text-white px-3 rounded-md py-3">
              <FaBox size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">Pending Orders</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{pendingorder?.data?.meta?.total}</span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-blue-400 text-white px-3 rounded-md py-3">
              <LuPackage size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">Total Orders</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{data?.data?.meta?.total}</span>
            </span>
          </span>
        </li>

       
      </ul>

      <div className="shadow-xl w-full rounded-lg bg-[#f8faff] p-6">
        <h2 className="text-xl font-semibold">All Orders</h2>
        <ul className="flex items-center justify-between">
          <li className="text-sm text-blue-500 md:block hidden">Recent Orders</li>
          <li className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                {...register('search')}
                placeholder="Search orders..."
                className="py-[2px] pl-4 w-40 placeholder:text-sm border border-gray-300 rounded-xl focus:outline-none"
              />
              <IoMdSearch className="absolute right-3 text-gray-500 text-xl" />
            </div>
            <div className="relative flex items-center">
              <div className="w-full flex py-1 px-4 border border-gray-300 rounded-xl focus:outline-none">
                <h2 className="text-sm text-gray-400">Sort by:</h2>
                <select  onChange={(e) => setSort(e.target.value)} className="text-sm text-black font-semibold focus:outline-none">
                <option  value="-createdAt"  >Ass</option>
                <option  value="createdAt">Dre</option>
                </select>
              </div>
            </div>
          </li>
        </ul>

        <div className="overflow-x-auto mt-10">
          <ul className="bg-white shadow-md rounded-lg overflow-hidden">
            <li className="grid grid-cols-[2fr_3fr_2fr_1fr_1fr] p-3 bg-gray-100 text-gray-600 font-semibold">
              <span>Order ID</span>
              <span className="hidden sm:block">Customer</span>
              <span>Shop</span>
              <span>Pirce</span>
              <span className="text-center">Status</span>
            </li>

            {data?.data?.result?.map((order:TOrder, index:number) => (
              <li
                key={index}
                className="grid grid-cols-[2fr_3fr_2fr_1fr_1fr] p-3 border-b last:border-none hover:bg-gray-50 text-gray-700 items-center"
              >
                <span>{order.tranId}</span>
                <span className="hidden sm:block">{order.name}</span>
                <span>{order.sellShopName}</span>
                <span className="font-medium">${order.price}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-lg font-medium text-center ${
                    order.paidStatus ===  "canceled" ||   order.paidStatus ===   "failed"
                      ? "bg-red-500 text-white"
                      : order.paidStatus === "complted"
                      ? "bg-green-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.paidStatus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Pagination totalpage={data?.data?.meta?.totalPage} pagenumber={setpage}/>
    </div>
  );
};

export default Order;
