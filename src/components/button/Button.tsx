

const Button = ({title}:{title:string}) => {
  return (
    <div>
      <button className="px-6 flex w-full justify-center  py-3  bg-[#f23b3b] text-white rounded-lg hover:bg-white hover:text-red-400 hover:shadow-md hover:shadow-red-400 hover:scale-105 duration-200">
                  <span className="text-sm text-center">{title}</span>
                  </button>
    </div>
  )
}

export default Button
