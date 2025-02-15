import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import ReactLoading from 'react-loading';
import Pagination from "../../../components/pagination/Pagination";
import { useState } from "react";
import { useGetAllProductQuery } from "../../../redux/features/product/productApi";




const StarRating = ({ rating }:{rating:number}) => {

   
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  return <span className="flex gap-1">{stars}</span>;
};

const Review = () => {
  const [page,setpate] = useState(1);
  const {data,isLoading} =  useGetAllProductQuery([{name:"limit",value:4},{name:'page',value:page},{name:"fields",value:"rating"}])
   
  return (
    <div className="shadow-xl w-full rounded-lg bg-white p-6  mx-auto">
      {
                 isLoading &&  <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
              }
      <h2 className="text-xl font-semibold mb-4 md:text-left text-center">Customer Reviews</h2>
      <ul className="space-y-4">
        {data?.data?.result?.map((review:{name:string,rating:number,}, index:number) => (
          <li key={index} className="border-b pb-4 last:border-none flex flex-col items-center text-center sm:text-left sm:items-start">
            <h3 className="text-lg font-medium">{review.name}</h3>
            <StarRating rating={review.rating} />
          </li>
        ))}
      </ul>
      <Pagination totalpage={data?.data?.meta?.totalPage } pagenumber={setpate}/>
    </div>
  );
};

export default Review;
