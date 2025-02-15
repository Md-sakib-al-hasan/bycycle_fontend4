import { BsPrinter } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import { FaChartSimple } from "react-icons/fa6"
import ChartComponent from "./Chart"
import ReactLoading from 'react-loading';
import { useGetAllOrderQuery, useGetTodAllPriceQuery } from "../../../redux/features/order/orderApi"
import { useGetAllUserQuery } from "../../../redux/features/user/userApi";


const DashboardHome = () => {
   const {data,isLoading} =  useGetAllUserQuery(null, { pollingInterval: 10 * 60 * 1000 })
   const {data:order,isLoading:isorderloding} =  useGetAllOrderQuery(null, { pollingInterval: 1 * 60 * 1000 })
   const {data:todaymoney,isLoading:istodaymoneyloading} = useGetTodAllPriceQuery(null, { pollingInterval: 1 * 60 * 1000 })
  return (
    <div className="shadow-lg bg-[#f8faff] p-6 space-y-6">
       {
          isLoading || isorderloding || istodaymoneyloading &&   <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
      <h1 className="text-xl font-semibold">Sakib al ahsan</h1>
      <ul className=" grid md:grid-cols-3  xl:gap-10  gap-5">
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="flex flex-col gap-2"><h4 className="lg:text-xl md:text-md font-medium">{`Today's Money`}</h4><span className="lg:text-3xl text-2xl font-semibold">${todaymoney?.data?.totalPrice}</span></span>
            <span className="bg-red-400 text-white px-3 rounded-md py-3" ><BsPrinter size={25} /></span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="flex flex-col gap-2"><h4 className="lg:text-xl md:text-md font-medium">Total User</h4><span className="lg:text-3xl text-2xl  font-semibold">{data?.data?.meta.total}</span></span>
            <span className="bg-red-400 text-white px-3 rounded-md py-3" ><FaRegUser size={25} /></span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center md:items-start">
            <span className="flex flex-col gap-2"><h4 className="lg:text-xl md:text-md font-medium">Total Sales</h4><span className="lg:text-3xl text-2xl font-semibold">{order?.data?.meta.total}</span></span>
            <span className="bg-red-400 text-white px-3 rounded-md py-3" ><FaChartSimple size={25} /></span>
          </span>
        </li>
      </ul>
      <ChartComponent/>

    </div>
  )
}

export default DashboardHome
