import { FaBoxOpen, FaBoxes, FaExclamationTriangle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../../../components/pagination/Pagination";
import ReactLoading from 'react-loading';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { TProduct } from "../../../types";
import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../../../redux/features/product/productApi";


const Product = () => {
     const [page,setpage] = useState(1)
     const [stockout,setStockout] = useState(0)
     const [sort,setSort] = useState("-createdAt")
       const { register, watch } = useForm();
         const searchValue = watch("search");
         const {data,isLoading} =  useGetAllProductQuery([{name:"sort",value:sort},{name:"searchTerm",value:(searchValue === undefined?"":searchValue)},{name:"limit",value:8},{name:'page',value:page},], { pollingInterval: 10 * 60 * 1000 })
         const {data:st} =  useGetAllProductQuery([{name:"limit",value:1000000},], { pollingInterval: 10 * 60 * 1000 })
         
         
         useEffect(() => {
          if (st?.data?.result) {
            const stockoutCount = st.data.result.reduce(
              (count:number, product:{quantity:number}) => (product.quantity <= 0 ? count + 1 : count),
              0
            );
            setStockout(stockoutCount);
          }
        }, [data]);
  
         return (
    <div className="p-6">
       {
          isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }

      <ul className="grid md:grid-cols-3 xl:gap-10 gap-5">
        
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-red-400 text-white px-3 rounded-md py-3">
              <FaExclamationTriangle size={25} />
            </span>
            <span className="flex flex-col gap-2 text-right">
              <h4 className="lg:text-xl md:text-md font-medium">Stockout Product</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{stockout}</span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-green-400 text-white px-3 rounded-md py-3">
              <FaBoxes size={25} />
            </span>
            <span className="flex flex-col gap-2 text-right">
              <h4 className="lg:text-xl md:text-md font-medium">All Product</h4>
              <span className="lg:text-3xl text-2xl font-semibold">{data?.data?.meta?.total}</span>
            </span>
          </span>
        </li>
        <li className="shadow-xl lg:px-6 md:px-2 py-8 px-8 rounded-md">
          <span className="flex justify-between lg:items-center items-start">
            <span className="bg-blue-400 text-white px-3 rounded-md py-3">
              <FaBoxOpen size={25} />
            </span>
            <span className="flex flex-col gap-2 text-right">
              <h4 className="lg:text-xl md:text-md font-medium">Add Product</h4>
              <span className="lg:text-3xl text-2xl font-semibold"><Link to="/admin/addproduct">Add</Link></span>
            </span>
          </span>
        </li>
      </ul>

      <div className="shadow-xl w-full rounded-lg bg-[#f8faff] p-6 mt-6">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="flex items-center justify-end mt-4">
          <div className="relative flex items-center">
            <input
              type="text"
              {...register('search')}
              placeholder="Search products..."
              className="py-2 pl-4 w-60 placeholder:text-sm border border-gray-300 rounded-xl focus:outline-none"
            />
            <IoMdSearch className="absolute right-3 text-gray-500 text-xl" />
            <div className="relative md:flex items-center pl-4  hidden ">
              <div className="w-full flex py-3 px-4 border border-gray-300 rounded-xl focus:outline-none">
                <h2 className="text-sm text-gray-400">shortby:</h2>
                <select  onChange={(e) => setSort(e.target.value)} className="text-sm text-black font-semibold focus:outline-none">
                  <option  value="-createdAt"  >Ass</option>
                  <option  value="createdAt">Dre</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <ul className="bg-white shadow-md rounded-lg overflow-hidden">
            <li className="grid grid-cols-4 p-4 bg-gray-100 text-gray-600 font-semibold text-center">
              <span className="w-full">Name</span>
              <span className="w-full">Quantity</span>
              <span className="w-full">Stockout</span>
              <span className="w-full">Price</span>
            </li>
            {data?.data?.result.map((product:TProduct, index:number) => {
                 
              return  (
                <li
                  key={index}
                  className="grid grid-cols-4 p-4 border-b last:border-none hover:bg-gray-50 text-gray-700 text-center"
                >
                  <span className="w-full">{product.name}</span>
                  <span className="w-full">{product.quantity}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-lg font-medium text-center mx-auto w-16 ${
                      product.quantity === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.quantity ===0 ?"Yes":"NO"}
                  </span>
                  <span className="w-full">${product.price}</span>
                </li>
              )
            } )}
          </ul>
        </div>
      </div>
      <Pagination totalpage={data?.data?.meta?.totalPage} pagenumber={setpage}/>
    </div>
  );
};

export default Product;
