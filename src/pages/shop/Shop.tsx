import { FaSearch } from "react-icons/fa";
import Banner from "../../components/banner/Banner";
import Card from "../../components/card/Card";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { TProduct } from "../../types";
import Pagination from "../../components/pagination/Pagination";
import ReactLoading from 'react-loading';
//import imge
import shopinge from "../../assets/shopbanner.jpg"
import { useGetAllProductQuery } from "../../redux/features/product/productApi";

const categories = [
  { name: 'All', number: 1457 },
  { name: 'Road Bicycles', number: 245 },
  { name: 'Flat Bar Road Bikes', number: 346 },
  { name: 'Touring Bicycles', number: 604 },
  { name: 'Hybrid Bicycles', number: 338 },
  { name: 'Cross Bikes', number: 130 },
  { name: 'Freight Bicycles', number: 372 },
  { name: 'Helmet', number: 742 },
  { name: 'Bike Bag', number: 810 },
];


// [,{name:"searchTerm",value:(searchValue === undefined?"":searchValue)},{name:"limit",value:8},,], { pollingInterval: 10 * 60 * 1000 }
const Shop = () => {
    const { register, watch } = useForm();
    const searchValue = watch("search");
    const [size,setSize] = useState("")
    const[page,setpage]= useState(1)
   
    const sizeconditon = size === "S" || size ==="M" || size === "L" || size == "XL"


    const {data,isLoading} = useGetAllProductQuery([
      {name:"limit",value:12},
      {name:'page',value:page},
      {name:(sizeconditon?"size":""),value:size},
      {name:"searchTerm",value:(searchValue === undefined?"":searchValue)},
    ])
  return (
    <div className="space-y-20 ">
       {
          isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
      <section> <Banner title="Shop" page="Shop"/></section>
      <section>
      <div className="md:flex ">
          {/* leftsidbar */}
           <div className="lg:w-3/12 md:w-4/12 ">
           <ul className=" px-4  space-y-8 ">
          <li>
              <div className="flex items-center justify-center  ">
                <div className="flex items-center border border-red-400 rounded-lg  w-full shadow-lg ">
                <button
                    className="  p-2  focus:outline-none"
                  >
                    <FaSearch /> 
                  </button>
                  <input
                    type="text"
                    {...register("search")}
                    className="border-none p-2 rounded-l-lg w-full focus:outline-none "
                    placeholder="Search..."
                  />
                </div>
              </div>
          </li>
          <li className="shadow-lg border-[1px] p-6 rounded-md ">
            <h2 className="text-xl font-medium pb-6 ">Categories</h2>
             <ul className="space-y-3">
              {  categories.map(item => <li  key={item.name} className="flex hover:text-red-400  justify-between"><span>{item.name}</span></li> )}
             </ul>
          </li>
          <li>
          </li>
          <li className="px-4 py-10 shadow-lg">
            <div className="space-y-5">
            <span className="text-xl block">Size</span>
             <ul className="flex justify-between">
               <li onClick={() => setSize("S")} className="text-xl border-2 py-1 px-2 hover:bg-red-500 hover:text-white">S</li>
               <li onClick={() => setSize("M")} className="text-xl border-2 py-1 px-2 hover:bg-red-500 hover:text-white">M</li>
               <li onClick={() => setSize("L")} className="text-xl border-2 py-1 px-2 hover:bg-red-500 hover:text-white">L</li>
               <li onClick={() => setSize("XL")} className="text-xl border-2 py-1 px-2 hover:bg-red-500 hover:text-white">XL</li>
               <li onClick={() => setSize("")} className="text-xl border-2 py-1 px-2 hover:bg-red-500 hover:text-white">All</li>
              </ul> 
            </div>
            <div>
            
            </div>
            
          </li>
          </ul>
            <div className="flex justify-center items-center">
            <img src={shopinge} alt="shob banner" />
            </div>
            </div>   
           {/* righsidebar */}
          <div className="lg:w-9/12 md:w-8/12 shadow-lg">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:m-auto m-10">
            {
            data?.data?.result?.map((item:TProduct) =>  
            <Card name={item.name} id={item.id} img={item.img} newprice={item.newprice} oldprice={Number(item.price)} rating={Number(item.rating)} key={item.id}></Card> )
        } 
            </div>
            <Pagination totalpage={data?.data?.meta?.totalPage}  pagenumber={setpage} />
       
          </div>
      </div>
      </section>
    </div>
  )
}

export default Shop;
