import { LuShoppingCart } from "react-icons/lu";
import Rating from "../rating/Rating";
import { Link } from "react-router-dom";

const Card = ({rating,newprice,oldprice,name,img, id}:{id:string,rating:number,newprice:number,oldprice:number,name:string,img:string}) => {
   
  return (
      <div>
        <div className="relative group    xl:h-[400px] lg:h-[300px] h-[500px]">
          {/* Overlay (Removed opacity and made it full cover) */}
          <Link to={`/cart/${id}`}> 
          <div className="absolute z-20 top-4 right-4 bg-red-500 cursor-pointer p-3 rounded-full hidden group-hover:block ">
           <LuShoppingCart size={25} className="text-white " />
           </div>
           </Link>
          <div className="absolute inset-0 rounded-xl bg-[#f88f84] transition-all duration-500 ease-in-out  group-hover:rounded-xl group-hover:origin-top-left group-hover:rotate-3 group-hover:translate-y-3" />
           
          <div className="relative z-10 bg-white border-[1px] w-full h-full shadow-xl rounded-xl   flex flex-col justify-center space-y-1  p-8">
             
             <img src={img} alt="service icon" className="mb-4" />
              <h2 className="text-xl font-semibold text-left  ">{name}</h2>
              <h4 className="text-xl font-semibold flex gap-2"><span className="line-through text-gray-400">${oldprice}</span><span>${newprice}</span></h4>
              <div className="pb-10">
              <Rating rating={rating} />
              </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Card;
  