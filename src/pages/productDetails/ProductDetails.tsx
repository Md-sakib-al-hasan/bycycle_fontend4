import Banner from "../../components/banner/Banner"
import img from "../../assets/deleted/bicycle01.jpg"
import Rating from "../../components/rating/Rating"
import { FaRegHeart } from "react-icons/fa"
import Button from "../../components/button/Button"
import TrendingProduct from "../../components/trendingProducts/TrendingProduct"


const categoriesarray = ["Mountain","Bicycle","Hybrid","Road Bikes"]

const ProductDetails = () => {
  return (
    <div className="space-y-20">
     <section><Banner page="Detail" title="Product Detail"/></section>
     <section>
        <div className="container grid lg:grid-cols-2 grid-cols-1 place-items-center gap-8">
           <img className="shadow-lg border-[1px] max-h-[550px] w-full object-cover" src={img} alt="product image" />
           <ul className="flex flex-col gap-y-5 justify-center lg:items-start items-center">
               <h2 className="text-4xl font-semibold  ">Mountain Bike</h2>
               <li className="text-3xl"><span className="line-through text-gray-400">$50</span><span>$40</span></li>
               <li><Rating rating={3} /></li>
               <li className="flex gap-2 items-center">
                    <button className="md:px-2 px-1  hover:bg-red-500 hover:text-white  border-2"> -</button>
                    <button className="md:px-6 px-4 py-2  border-2 ">1</button>
                    <button className="md:px-2 px-1 hover:bg-red-500  hover:text-white  border-2  "> +</button>
                    <Button title="Add To Cart"/>
                    <button className="md:px-3 px-2 hover:text-red-500 py-1  border-2"><FaRegHeart size={20} /></button>
                </li>
               <li>
                  <ol className="flex gap-4 flex-wrap justify-center">
                     <li>Categories:</li>
                     {
                        categoriesarray.map(item => <li key={item}>{item}</li>)
                     }
                  </ol>
               </li>
               <li>
                  <ol className="flex gap-4 flex-wrap justify-center">
                     <li>Categories:</li>
                     {
                        categoriesarray.map(item => <li className="border-2 xl:px-2 lg:px-1 py-1 hover:text-red-400" key={item}>{item}</li>)
                     }
                  </ol>
               </li>
           </ul>
        </div>
     </section>
     <section> 
     </section>
       <TrendingProduct/>
    </div>
  )
}

export default ProductDetails
