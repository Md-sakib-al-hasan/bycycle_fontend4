import ServiceCard from "./component/ServiceCard"
import fastdeliveryicon from "../../assets/component/services/fast-delivery.png"
import genuineiproducticon from "../../assets/component/services/genuine.png"
import supporticon from "../../assets/component/services/customer-service.png"
import returnicon from "../../assets/component/services/return.png"

const serviceArray = [ 
    {
        icon:fastdeliveryicon,
        title:"Fast Delivery",
        description:`Experience lightning-speed shipping with our express delivery service.`
    },
    {
        icon:genuineiproducticon,
        title:"Genuine Product",
        description:`We ensure genuine products with top-notch quality assurance.`
    },
    {
        icon:supporticon,
        title:"24X7 Support",
        description:`Instant solutions with our dedicated 24x7 customer support`
    },
    {
        icon:returnicon,
        title:"7 Days Return",
        description:`Our 7-day return policy ensures a worry-free shopping experience`
    }
 ]


const Service = () => {
  return (
    <div className="bg-white">
      <div className="container gap-8 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {
            serviceArray.map((item) => <span key={item.title}><ServiceCard title={item.title} icon={item.icon} description={item.description} /></span>)
        }
      
      </div>
    </div>
  )
}

export default Service
