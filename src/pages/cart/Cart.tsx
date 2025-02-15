import Banner from "../../components/banner/Banner"
import { FaRegHeart } from "react-icons/fa"
import paymentcard from "../../components/../assets/Cart/payment.jpg"
import Service from "../../components/service/Service"
import { useParams, useSearchParams } from "react-router-dom"
import { useGetSingleProductQuery } from "../../redux/features/product/productApi"
import { useEffect, useState } from "react"
import  { Toaster,toast } from "react-hot-toast"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentUser } from "../../redux/features/auth/authSlice"
import { useAddWhitelsitMutation, useGetSingleuserQuery } from "../../redux/features/user/userApi"
import ReactLoading from 'react-loading';
import { useAddorderMutation } from "../../redux/features/order/orderApi"


const Cart = () => {
  const user = useAppSelector(selectCurrentUser)
  const [addwhitlist] = useAddWhitelsitMutation();
  const [quentity,SetQuentity] = useState(1)
  const {id} = useParams();
  const [ searchParams] = useSearchParams();
  const {data,isLoading} = useGetSingleProductQuery({id});
  const  newdata = data?.data;
  const {data:userdata} = useGetSingleuserQuery({email:user?.useremail}) ;
  const currentuser = userdata?.data;
  const [createOrder] = useAddorderMutation();
  const message = searchParams.get("message");




  useEffect(() => {
    if(message==="PaymentFailed"){
      toast.error("PaymentCanceled")
    }
    if(message==="PaymentSuccessful"){
      toast.success("The payment is successful")
    }
    if(message==="PaymentCanceled"){
      toast.error("The payment is Failed")
    }

  }, [message])

 const  onsubmit = async() => {
  if(newdata?.quantity <=0) {
    toast.error("This is out of stock")
    return
    }
   const addorder = {
    name:currentuser?.name,
    email:user?.useremail,
    phone:currentuser?.phone,
    productId:id,
    quantity:quentity,
    img:newdata?.img,
    type:newdata?.type,
    sellShopName:newdata?.company,
    productname:newdata?.name,

   }
   const reusllt = await createOrder(addorder).unwrap()
  
   window.location.replace(reusllt?.data?.paymentURL)
 }
 

const handlewhitelist = async() => {
 
 
   const whitelistproduct = {
  email:user?.useremail,
  productname:newdata?.name,
  productId:id,
  price:newdata?.newPrice,
  img:newdata?.img,
  type:newdata?.type  ,
  sellShopName:newdata?.company,
   }
   await addwhitlist(whitelistproduct)
   toast.success('successfully add whit list')
}

const handlearemovequenty = () => {
   if(quentity == 1){
    toast.error('You must at list one select')
   }
  SetQuentity((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
};

const handleaddquenty = () => {
    
   if(quentity ===newdata?.quantity) {
     toast.error('out of Quentity')
   }
  SetQuentity((prevPage) => (prevPage < newdata?.quantity? prevPage + 1 : prevPage));
};
 
  return (
    <div className="space-y-28">
       {
          isLoading &&       <div className="absolute inset-0  flex items-center justify-center "> <ReactLoading type={"bars"}  color={'red'} /></div>
        }
      <Banner title="Cart" page="Cart"/>
      <div className="container lg:flex   gap-6">
       <div className="  shadow-2xl border-2 rounded-md lg:w-8/12 w-full p-4 space-y-3 ">
          <h2 className="text-2xl font-medium">My Bag</h2>
          <hr className="h-1  w-full" />
          <div className="flex pt-8  gap-5  relative">
          <Toaster/>
            <img className=" md:w-40 w-32 shadow-md" src={newdata?.img} alt="product name" />
            <ul className="space-y-3">
               <li className="md:text-xl text-lg font-medium">{newdata?.name}</li>
               <li className="space-x-2"> <span className="text-xl line-through text-gray-400 ">${newdata?.price}</span> <span className="text-2xl font-semibold">${newdata?.newPrice }</span></li>
               <li onClick={()=> "sk"} className="flex gap-2 items-center">
                   <button onClick={handlearemovequenty} className="md:px-2 px-1  hover:bg-red-500 hover:text-white  border-2"> -</button>
                   <button className="md:px-6 px-4 py-2  border-2 ">{quentity}</button>
                   <button  onClick={handleaddquenty} className="md:px-2 px-1 hover:bg-red-500  hover:text-white  border-2  "> +</button>
                   <button onClick={handlewhitelist} className="md:px-3 px-2 hover:text-red-500 py-1  border-2"><FaRegHeart size={20} /></button>
               </li>
            </ul>

          </div>

          
       </div>
       {/* payment opitons */}
       <div className="lg:w-4/12 w-full shadow-2xl rounded-md  border-2 p-5 space-y-5 ">
         <h2 className="text-2xl font-medium">Total</h2>
         <ul className="font-medium space-y-3 pt-4">
          <li className="flex justify-between"><span>Sub Total</span> <span>${quentity* newdata?.newPrice}</span></li>
          <li  className="flex justify-between"><span>Delivery Charges</span> <span>${(quentity* newdata?.newPrice)/10}</span></li>
          <li  className="flex justify-between"><span>GST</span> <span>${(quentity* newdata?.newPrice)/20}</span></li>
          <li  className="flex justify-between"><span>Grand Total</span> <span>${((quentity* newdata?.newPrice)/20)+((quentity* newdata?.newPrice)/10)+(quentity* newdata?.newPrice)}</span></li>
         </ul>
         <button onClick={onsubmit} className="px-6 flex w-full justify-center  py-3  bg-[#f23b3b] text-white rounded-lg hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">Checkout</button>
         <h2>We Accept</h2>
         <img src={paymentcard} alt="Payment Card" />
       </div>
      </div>
      <Service/>
      <div>
        
      </div>
    </div>
  )
}

export default Cart
