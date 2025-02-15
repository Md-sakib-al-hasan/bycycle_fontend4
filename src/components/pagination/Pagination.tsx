


const Pagination = ({totalpage,pagenumber,}:{totalpage:number,pagenumber:React.Dispatch<React.SetStateAction<number>>,}) => { 
    const handlePrev = () => {
        pagenumber((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleNext = () => {
        pagenumber((prevPage) => (prevPage < totalpage ? prevPage + 1 : prevPage));
    };
  return (
    <div className="w-full  py-10 flex items-center justify-center space-x-4">
    <button onClick={handlePrev} className="px-4 py-2  rounded-md  hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">Prev</button>
    {/* Conditionally render page numbers */}
     
    <div className="flex space-x-2">
      {/* Example for page 1 */}
      {Array.from({ length: totalpage }, (_, i) => (
        <button onClick={ () =>pagenumber(i+1)} key={i} className="px-3 py-2 bg-red-500 rounded-md text-white ">{i + 1}</button>
      ))}
    </div>

    <button onClick={handleNext} className="px-4 py-2  rounded-md  bg-white hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">Next</button>
  </div>
  )
}

export default Pagination
