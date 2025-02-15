import { useForm, SubmitHandler } from "react-hook-form";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import logoFotere from "/Logo.png";

const categoriesarray = ["Road bikes", "Mountain bikes", "Hybrid bikes", "Cyclocross bikes", "Folding bikes"];
const navbaritem = [
   { name: 'Home', path: '/' },
   { name: 'Shop', path: '/shop' },
   { name: 'About', path: '/about' },
   { name: 'Contact us', path: '/contact_us' },
   { name: 'Profile', path: '/profile' },
   { name: 'My Order', path: '/myorder' },
];

type FormInputs = {
   email: string;
};

const Footer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = () => {
   
    // Handle your form submission here, e.g., send the email to your API
  };

  return (
    <div className="bg-[#fffbf1]">
       <div className="container grid lg:grid-cols-4 md:grid-cols-2 lg:gap-4 gap-y-8 gap-x-6 py-20">
             <ul className="space-y-4">
                <li><img src={logoFotere} alt="Logo" /></li>
                <li>Cycling offers quality bicycles with fast delivery and 24x7 support</li>
                <li className="flex gap-4">
                     <a href="https://www.facebook.com" className="text-gray-600 hover:text-red-500 hover:scale-125" target="_blank" rel="noopener noreferrer">
                        <TiSocialFacebook size={22} />
                     </a>
                     <a href="https://www.twitter.com" className="text-gray-600 hover:text-red-500  hover:scale-125" target="_blank" rel="noopener noreferrer">
                        <IoLogoTwitter size={22} />
                     </a>
                     <a href="https://plus.google.com" className="text-gray-600 hover:text-red-500  hover:scale-125" target="_blank" rel="noopener noreferrer">
                        <IoLogoGoogleplus size={22} />
                     </a>
                     <a href="https://www.linkedin.com" className="text-gray-600 hover:text-red-500  hover:scale-125" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn size={22} />
                     </a>
                  </li>
             </ul>

             <ul className="space-y-2">
                <h2 className="text-2xl font-medium">Categories</h2>
                {categoriesarray.map((item, index) => (
                    <li className="hover:text-red-500" key={index}>{item}</li>
                ))}
             </ul>

             <ul className="space-y-2">
                <h2 className="text-2xl font-medium">Overviews</h2>
                {navbaritem.map(item => (
                    <li key={item.name} className="hover:text-red-500">
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
             </ul>

             <ul className="space-y-2">
                <li className="text-2xl font-medium">Newsletter</li>
                <p>Stay updated with the latest bicycles, exclusive deals, and special offers</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <input
                    className="border-none focus:outline-none py-2 px-2 mt-3"
                    placeholder="Enter your Email.."
                    type="email"
                    {...register("email", { required: "Email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, message: "Invalid email address" } })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                  <span className="block w-6/12">
                    <Button title="Subscribe" />
                  </span>
                </form>
             </ul>
       </div>
    </div>
  );
};

export default Footer;
