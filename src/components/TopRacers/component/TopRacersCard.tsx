import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";

const TopRacersCard = ({name,wining,imge}:{name:string,wining:string,imge:string}) => {
  return (
    <div className=" bg-red-500 group relative overflow-hidden rounded-lg">
      <img className="rounded-lg w-full" src={imge} alt="Top Racer" />
      <div className="absolute inset-0 flex flex-col justify-end items-center">
        <button
          className="px-2 py-3 w-11/12 bg-white/90 text-black rounded transition-all duration-500 ease-in-out h-10 group-hover:h-32 flex flex-col items-center justify-center absolute bottom-6 left-0 right-0 mx-auto"
        >
          <span className="group-hover text-lg font-semibold">{name}</span>
          <span className="hidden group-hover:block">{wining}</span>
          <div className="hidden group-hover:flex gap-4 mt-2">
            <a href="https://www.facebook.com" className="text-gray-600 hover:text-red-500 hover:scale-125" target="_blank" rel="noopener noreferrer">
              <TiSocialFacebook size={22} />
            </a>
            <a href="https://www.twitter.com" className="text-gray-600 hover:text-red-500 hover:scale-125" target="_blank" rel="noopener noreferrer">
              <IoLogoTwitter size={22} />
            </a>
            <a href="https://plus.google.com" className="text-gray-600 hover:text-red-500 hover:scale-125" target="_blank" rel="noopener noreferrer">
              <IoLogoGoogleplus size={22} />
            </a>
            <a href="https://www.linkedin.com" className="text-gray-600 hover:text-red-500 hover:scale-125" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopRacersCard;
