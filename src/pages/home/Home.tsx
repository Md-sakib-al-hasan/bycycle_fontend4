import { Link } from "react-router-dom"
import bannerimge from "../../assets/Home/HomeBackendBanner.png"
import infoimage from "../../assets/Home/info.png"
import namebycycleimage from "../../assets/Home/name-bicycle2.png"
import bycycleimge from "../../assets/Home/banner-bicycle.png"
import Button from "../../components/button/Button"
import Service from "../../components/service/Service"
import Aboutus from "../../components/About_us/Aboutus"
import Card from "../../components/card/Card"
import TrendingProduct from "../../components/trendingProducts/TrendingProduct"
import SliderComponent from "../../components/testimonial/SlideComponet"

import { TProduct } from "../../types"
import ReactLoading from 'react-loading';
import { useGetAllProductQuery } from "../../redux/features/product/productApi"

const Home = () => {
   const {data,isLoading} = useGetAllProductQuery([{name:"limit",value:40}])
   
  return (
    <div className=" w-full space-y-32 ">
       {
                    isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
       {/* Banner  */}
       <section>
          <div className="relative ">
            <img className="w-full" src={bannerimge} alt="banner image" />
            <div className="absolute inset-0 container  grid grid-cols-2 place-content-center ">
               <div className="">
                 <h3 className="md:text-3xl font-semibold ml-1 text-[#182c42]  md:pb-6">For A Better Ride</h3>
                 <h2 className="space-y-1">
                   <span className=" block lg:text-7xl md:text-6xl text-4xl font-bold text-[#182c42]">Find Your</span>
                   <span className=" block lg:text-7xl md:text-6xl text-4xl font-bold text-red-500">Mountain</span>
                   <span className=" block lg:text-7xl md:text-6xl text-4xl font-bold text-[#182c42]" >Bike</span>
                  </h2>
                  <div className="lg:w-3/12 md:w-5/12 md:pt-10 md:block  hidden">
                   <Link to={"/shop"}><Button title="Shop Now" /></Link>
                  </div>
               </div>
               <img  className="animate-shake animate-infinite animate-duration-[3000ms] animate-ease-linear" src={bycycleimge} alt="bycycle" />
            </div>

          </div>
       </section>
       <section>
        <Service/>
       </section>
       <section>
        <Aboutus/>
       </section>
       {/* Featured products */}
       <section>
           <div className="container space-y-10 text-center ">
                <h2 className="text-5xl font-semibold">Teaturd Products</h2>
                <p className="text-md">Check out our featured products, carefully selected for quality and style</p>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  { data?.data?.result.map((item:TProduct) =>  <Card rating={Number(item.rating)} newprice={item.newprice} oldprice={Number(item.price)} name={item.name} img={item.img} id={item.id} key={item.id}></Card> )}
                </div>
                 
           </div>
       </section>
       <section >
          <div className="relative">
           <img className="w-full" src={infoimage} alt="bycycleinfoimage" />
           <div className="container absolute inset-0 flex justify-center items-center ">
             <img src={namebycycleimage} alt="bycycle" />
           </div>
          </div>
       </section>
       <section>
          <TrendingProduct/>
       </section>
       <search>
            <div className="container text-center space-y-10 ">
                  <h2 className="text-5xl font-semibold">Testimonial</h2>
                  <p className="text-md">Hear what our clients have to say about their experience with us!</p>
                  <SliderComponent/>
            </div>
       </search>
    </div>
  )
}

export default Home
