import { FaUser, FaUserPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { useState } from "react";
import { useGetAllUserQuery } from "../../../redux/features/user/userApi";
import {  useForm } from "react-hook-form";
import { TCurrenuser } from "../../../types/User.types";
import ReactLoading from 'react-loading';


const User = () => {
   const [page,setpage] = useState(1)
   const [sort,setSort] = useState("-createdAt")
     const { register, watch } = useForm();
       const searchValue = watch("search");
       const {data,isLoading} =  useGetAllUserQuery([{name:"sort",value:sort},{name:"searchTerm",value:(searchValue === undefined?"":searchValue)},{name:"limit",value:8},{name:'page',value:page},], { pollingInterval: 10 * 60 * 1000 })
       const {data:customerdata,} =  useGetAllUserQuery([{name:"role",value:"customer"}], { pollingInterval: 10 * 60 * 1000 })
        
       return (
    <div>
      <ul className="grid md:grid-cols-3 xl:gap-10 gap-5">
              {
                      isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
                }
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-green-400 text-white px-3 rounded-md py-3">
              <LuUsers size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">All Customer</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{customerdata?.data?.meta.total}</span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-green-400 text-white px-3 rounded-md py-3">
              <FaUser size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">All Member</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{data?.data?.meta.total}</span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-green-400 text-white px-3 rounded-md py-3">
              <FaUserPlus size={25} />
            </span>
            <span className="flex flex-col gap-2">
              <h4 className="lg:text-xl md:text-md font-medium">Create Member</h4>
              <span className="lg:text-3xl text-2xl font-semibold">
                <span className="hover:text-red-400 cursor-pointer">
                  <Link to='/admin/adduser'>Add</Link>
                </span>
              </span>
            </span>
          </span>
        </li>
      </ul>

      <div className="shadow-xl w-full rounded-lg bg-[#f8faff] p-6">
        <h2 className="text-xl font-semibold">All Users</h2>
        <ul className="flex items-center justify-between">
          <li className="text-sm text-green-500 md:block hidden">Active Members</li>
          <li className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search users..."
                {...register('search')}
                className="py-[2px] pl-4 w-40 placeholder:text-sm border border-gray-300 rounded-xl focus:outline-none"
              />
              <IoMdSearch className="absolute right-3 text-gray-500 text-xl" />
            </div>
            <div className="relative flex items-center">
              <div className="w-full flex py-1 px-4 border border-gray-300 rounded-xl focus:outline-none">
                <h2 className="text-sm text-gray-400">shortby:</h2>
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
            {/* Header Row */}
            <li className="grid grid-cols-[2fr_3fr_2fr_1fr_1fr] p-3 bg-gray-100 text-gray-600 font-semibold">
              <span>Name</span>
              <span className="hidden sm:block">Email</span>
              <span>Phone</span>
              <span>Role</span>
              <span className="text-center">Status</span>
            </li>

            {/* User Rows */}
            {data?.data?.result.map((user:TCurrenuser, index:number) => (
              <li
                key={index}
                className="grid grid-cols-[2fr_3fr_2fr_1fr_1fr] p-3 border-b last:border-none hover:bg-gray-50 text-gray-700 items-center"
              >
                <span>{user?.name}</span>
                <span className="hidden sm:block">{user?.email}</span>
                <span>{user?.phone}</span>
                <span className="font-medium">{user?.role}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-lg font-medium text-center ${
                    user.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {user?.status}
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

export default User;
