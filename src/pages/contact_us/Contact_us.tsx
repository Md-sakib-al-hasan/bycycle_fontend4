
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Banner from "../../components/banner/Banner";
import Button from "../../components/button/Button";
import { PiTelegramLogoLight } from "react-icons/pi";
import {  FaRegMap, FaSkype } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const Contact_us = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <div>
      <Banner title="Contact us" page="Contact"/>
      <div className="flex relative">
        <div className="w-8/12 lg:h-[550px] h-[1000px]   bg-white">
        </div>
        <div className="w-4/12   lg:bg-red-400 bg-white">
          {/* You can add extra content on the right side if needed */}
        </div>
        <div className=" container absolute pt-16 inset-0 flex items-center">
         <div className="flex lg:flex-row flex-col gap-28 ">
            <div className="lg:w-6/12 w-full space-y-6"  >
            <h2 className="text-5xl font-semibold text-[#182c42] ">Get In Touch</h2>
            <p>
              Feel free to reach out to us with any questions, comments, or concerns.
              We are here to help and look forward to hearing from you!
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-6">
              <div>
                
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="name"
                      className="border p-2 w-full  focus:outline-none "
                      placeholder="Name"
                    />
                  )}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div>
                
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className="border p-2 w-full  focus:outline-none "
                      placeholder="Email"
                    />
                  )}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div>
               
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="message"
                      className="border p-2 w-full placeholder:pt-9 focus:outline-none "
                      rows={4}
                      placeholder="Message"
                    />
                  )}
                />
                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
              </div>

              <span className="block w-3/12">  <Button title="Submit"/></span>
            </form>

            {isSubmitted && <p className="text-green-500 mt-4">Thank you for your message!</p>}
            </div>
            <div className="lg:w-6/12  w-full">
                 <div className="bg-[#182c42]  xl:w-9/12 w-full rounded-xl md:px-14 px-4 py-10 text-white font-semibold" >
                    <h2 className="text-4xl pb-10 pt-4 ">Contact info</h2>
                    <ul className="space-y-8">
                      <li className="flex gap-5"><PiTelegramLogoLight size={25} /> <span>mdsakibalhasa@gmail.com</span></li>
                      <li className="flex gap-5"><FaPhone size={25} /> <span>01625457343</span></li>
                      <li className="flex gap-5"><FaRegMap  size={35}/> <span>22 Grandrose Street North Fort Myers, FL 33917</span></li>
                      <li className="flex gap-5"><FaSkype size={25} /> <span>live:cycling.example</span></li>
                    </ul>
                 </div>
             </div>
         </div>

        </div>
       
      </div>
      <div className="w-full bg-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14586.677838305395!2d90.26194453239447!3d23.936756051961762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sbicycle%20store!5e0!3m2!1sen!2sbd!4v1738786843189!5m2!1sen!2sbd"
          className="w-full h-[450px] border-none"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact_us;
