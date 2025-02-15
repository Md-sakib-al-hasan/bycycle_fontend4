
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useNavigate } from "react-router-dom";


import { useEffect } from "react";
import { z } from "zod";
import Button from "../button/Button";
import { useGetSingleuserQuery, useUpdateUserMutation } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits").optional(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Gender must be Male, Female, or Other" }),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const currentuser = useAppSelector(selectCurrentUser)
  const navigate = useNavigate();
  
  const [update,{isSuccess}] = useUpdateUserMutation();
  const {data} = useGetSingleuserQuery({email:currentuser?.useremail})
  const user = data?.data;
  const { register, handleSubmit, formState: { errors }, } = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema), defaultValues: {
    name: user?.name || '', 
    phone: user?.phone || '',
    address:user?.address || '',
    gender:user?.gender  || '',
   
  },});


  const onSubmit = (data:FieldValues) => {
    update(data)
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/customer');
    }
  }, [isSuccess, navigate]);

  return (
    <div className="bg-[#eff0f4] min-h-screen">
      <div className="container bg-[#eff0f4] py-4">
        <h3 className="text-xl font-medium mb-4">My Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white space-y-10 py-8">
            <div className="px-11 text-sm space-y-10">
              <ul className="grid md:grid-cols-3 gap-4 grid-col-1">
                <li className="flex flex-col">
                  <label className="text-lg">Full Name</label>
                  <input placeholder="Enter your name"
                    {...register("name")}
                    className="text-sm bg-transparent outline-none border-none cursor-pointer"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">{errors.name.message}</span>
                  )}
                </li>
                <li className="flex flex-col">
                  <label className="text-lg">Mobile</label>
                  <input placeholder="Enter your mobile number"
                    {...register("phone")}
                    className="text-sm bg-transparent outline-none border-none cursor-pointer"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">{errors.phone.message}</span>
                  )}
                </li>
              </ul>
              <ul className="grid md:grid-cols-3 gap-4 grid-cols-1">
                <li className="flex flex-col">
                  <label className="text-lg">Address</label>
                  <input placeholder="Enter your address"
                    {...register("address")}
                    className="text-sm bg-transparent outline-none border-none cursor-pointer"
                  />{errors.address && (
                    <span className="text-red-500 text-xs">{errors.address.message}</span>
                  )}
                </li>
                <li className="flex flex-col">
                  <label className="text-lg">Gender</label>
                  <input placeholder="Enter your genter"
                    {...register("gender")}
                    className="text-sm bg-transparent outline-none border-none cursor-pointer"
                  />
                  {errors.gender && (
                    <span className="text-red-500 text-xs">{errors.gender.message}</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="md:ml-10 mx-10 md:w-3/12">
             <Button  title="Save Change"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
