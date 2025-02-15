
import { ReactNode } from "react"

import { Link } from "react-router-dom"


const LinkButton = ({title,icon,path}:{title:string,path:string,icon:ReactNode}) => {
  return (
    <Link to={path}>
      <button className="text-black  py-2 px-2 items-center rounded-lg group   text-md hover:bg-red-400 hover:text-white w-full flex gap-2 ">
      <span className="text-gray-600 group-hover:text-white ">{icon}</span> <span className="text-gray-600 group-hover:text-white">{title}</span>
      </button>
    </Link>
  )
}

export default LinkButton
