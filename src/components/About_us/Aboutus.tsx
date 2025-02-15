import { FaRegCheckSquare } from "react-icons/fa"
import imge from "../../assets/login/about.jpg"
import Button from "../button/Button"
import { PiPlayCircleFill } from "react-icons/pi"
import { useState } from "react"


const Aboutus = () => {
      const [isVidoshow, setVidoeshow] = useState(false);
  return (
    <div className=" container grid lg:grid-cols-2 grid-cols-1 gap-12 relative" >
<div
  className={`${
    isVidoshow ? "block" : "hidden"
  } fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75`}
>
  <div className="relative w-[80%] max-w-3xl bg-white p-4 rounded-lg">
          {/* Close Button */}
          <button
            onClick={() => setVidoeshow(false)}
            className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-lg font-bold"
          >
            ✕
          </button>

          {/* Video */}
          <iframe
            className="w-full aspect-video rounded-lg"
            src="https://www.youtube.com/embed/KROi6zRh4o8?si=n-wad-ndFJjInQnY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>


       <div className="relative">
         <img className="rounded-xl w-full h-full object-cover" src={imge} alt="banner image" />
         <div className=" absolute inset-0 flex justify-center items-center overflow-hidden ">
          <span onClick={() => setVidoeshow(true)} > <PiPlayCircleFill className="text-red-500 bg-white w-20 h-20 rounded-full z-50" /></span>
           <div className=" lg:block hidden bg-red-500/80 z-0 w-[500px] h-[500px] absolute lg:top-[-120px] lg:right-[-360px] xl:top-[-160px] rotate-[8.30rad] xl:right-[-290px] rounded-3xl">
                     
           </div>
         </div>
       </div>
       <div className="space-y-5">
          <h2 className="text-5xl font-semibold">About Us</h2>
          <h4 className="text-2xl">We have been making bicycles for 25 years</h4>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <ul className="space-y-2">
              <li className="flex gap-3 items-center"><span className="text-red-500"><FaRegCheckSquare /></span><span>Sed ut perspiciatis unde omnis voluptatem</span></li>
              <li className="flex gap-3 items-center"><span className="text-red-500"><FaRegCheckSquare /></span><span>Iste natus error sit voluptatem beatae</span></li>
              <li className="flex gap-3 items-center"><span className="text-red-500"><FaRegCheckSquare /></span><span>Totam rem aperiam unde omnis laudantium</span></li>
              <li className="flex gap-3 items-center"><span className="text-red-500"><FaRegCheckSquare /></span><span>Wuasi architecto beatae explic omnis</span></li>
          </ul>
          <div className="sm:w-3/12  w-full ">
              <a href="/about"><Button title="Read More"/></a>
          </div>
      </div>
    </div>
  )
}

export default Aboutus
