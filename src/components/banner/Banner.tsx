import { Link } from 'react-router-dom'
import image from '../../assets/Cart/CartBanner.png'
const Banner = ({title,page}:{title:string,page:string}) => {
  return (
    <div className='relative'>
      <img src={image} className='w-full  h-52' alt="banner image" />
      <div className='absolute inset-0 flex flex-col justify-center items-center space-y-3 text-white'>
          <span className='text-6xl font-semibold '>{title}</span>
          <ul className='flex gap-2'>
            <li className='text-lg hover:text-red-400 cursor-pointer'><Link to="/">Home</Link></li>
            <li className='text-red-500 text-lg hover:text-red-400 cursor-pointer'>\</li>
            <li className='text-lg hover:text-red-400 cursor-pointer'>{page}</li>
          </ul>
      </div>
    </div>
  )
}

export default Banner
