
import SliderComponent from "../slider/Silder"



const TrendingProduct = () => {
  return (
    <div className="container space-y-10">
       <h2 className="text-5xl font-semibold text-center">Trending Products</h2> 
       <p className="text-md text-center">E-bikes, smart features, lightweight frames, sustainability, and adventure-ready designs. </p>
       <SliderComponent/>
    </div>
  )
}

export default TrendingProduct
