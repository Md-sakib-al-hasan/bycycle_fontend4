import { FieldValues, useForm } from "react-hook-form";
import Button from "../button/Button";
import { useChangepasswordMutation } from "../../redux/features/user/userApi";

import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { isChangepasswordShow } from "../../redux/features/LoginPage/loginSlice";

const ChangePassword = () => {
    const [ischangepassword, {isError} ] = useChangepasswordMutation();
    const distpatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:FieldValues) => {
   
    if(data.newPassword !== data.confirmPassword){
          toast.error("Your newPassord and configrmpassword don't match")
          return;
    }
    const newdata = {
      oldPassword:data.currentPassword,
      newPassword:data.newPassword,
  }
  ischangepassword(newdata);
  };
  
  useEffect(() => {
    if (isError) {
      toast.error("The current password don't match")
    }
  }, [isError]);


  return (
    <div className="bg-black/5 absolute z-10 w-full min-h-screen  flex justify-center items-center">
      <Toaster/>
      <div className=" md:min-w-96 min-w-80 relative   bg-white py-8 px-10 shadow-lg rounded-xl ">
        <span   onClick={() => distpatch(isChangepasswordShow(false))} className=" absolute text-sm font-semibold text-white right-[-16px] z-10 border-white border-[3px] bg-red-500 rounded-full p-[1px] top-[-12px]"><MdOutlineClear size={15} /></span>
        <h3 className="text-xl font-medium mb-6 text-center">Change Password</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 ">
              {/* Current Password */}
              <div className="flex flex-col">
                <label htmlFor="currentPassword" className="text-lg cursor-pointer">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...register("currentPassword", { required: "Current password is required" })}
                  placeholder="Enter current password"
                  className="text-sm px-3 py-2 border rounded-md outline-none focus:border-red-400"
                />
                {errors.currentPassword && (
                  <span className="text-red-500 text-xs mt-1">
                    {String(errors.currentPassword.message)}
                  </span>
                )}
              </div>

              {/* New Password */}
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="text-lg cursor-pointer">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  placeholder="Enter new password"
                  className="text-sm px-3 py-2 border rounded-md outline-none focus:border-red-400"
                />
                {errors.newPassword && (
                  <span className="text-red-500 text-xs mt-1">
                    {String(errors.newPassword.message)}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-lg cursor-pointer">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match",
                  })}
                  placeholder="Re-enter new password"
                  className="text-sm px-3 py-2 border rounded-md outline-none focus:border-red-400"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs mt-1">
                    {String(errors.confirmPassword.message)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
         
          <span className="block" > <Button title="Update Password"/></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
