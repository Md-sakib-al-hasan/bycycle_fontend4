

const ServiceCard = ({icon, title,description}:{icon:string,title:string, description:string}) => {
  return (
    <div>
      <div className="relative group  h-64">
        {/* Overlay (Removed opacity and made it full cover) */}
        <div className="absolute inset-0 rounded-xl bg-[#f88f84] transition-all duration-500 ease-in-out  group-hover:rounded-xl group-hover:origin-top-left group-hover:rotate-3 group-hover:translate-y-3" />
        <div className="relative z-10 bg-white border-[1px] w-full h-full shadow-xl rounded-xl space-y-2  flex flex-col justify-center items-center  p-6">
           <img src={icon} alt="service icon" className="mb-4" />
            <h2 className="text-lg font-semibold ">{title}</h2>
            <p className="text-md text-center ">
               {description}
            </p>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
