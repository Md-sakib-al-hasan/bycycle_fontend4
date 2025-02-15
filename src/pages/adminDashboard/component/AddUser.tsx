import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/button/Button";
import { useAdduserMutation } from "../../../redux/features/user/userApi";
import { Toaster,toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string(),
  gender: z.enum(["Male", "Femal", "Other"], { required_error: "Select a valid gender" }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
  userRole: z.enum(["admin", "customer", "superAdmin"], { required_error: "Select a valid role" }),
  profileImage: z.instanceof(FileList).optional(),
});

export default function AddUser() {
  const [sigine, {error}] = useAdduserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
   console.log(error)
  const onSubmit = async (data:FieldValues) => {
    try {
      console.log(data)
      await sigine(data).unwrap();
      toast.success('sigine in successfully');
      navigate('/admin/user')
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err:any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" bg-[#f8faff] mx-auto p-4  shadow-lg">
      <Toaster/>
      <div className=" grid gap-4 md:grid-cols-2 grid-cols-1">
        <div className="space-y-2">
            <label>Name:</label>
            <input {...register("name")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Email:</label>
            <input type="email" {...register("email")} className="border p-2 w-full  rounded-md focus:outline-none" />
            {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Password:</label>
            <input type="password" {...register("password")} className="border p-2 w-full  rounded-md focus:outline-none" />
            {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Gender:</label>
            <select {...register("gender")} className="border  p-3 w-full rounded-md focus:outline-none">
            <option  value="">Select</option>
            <option value="Male">Male</option>
            <option value="Femal">Femal</option>
            <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500">{String(errors.gender.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Address:</label>
            <input {...register("address")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.address && <p className="text-red-500">{String(errors.address.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Phone:</label>
            <input {...register("phone")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>User Role:</label>
            <select {...register("userRole")} className="border p-3 w-full rounded-md focus:outline-none">
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="customer">customer</option>
            <option value="superAdmin">SuperAdmin</option>
            </select>
            {errors.userRole && <p className="text-red-500">{String(errors.userRole.message)}</p>}
        </div>
      </div>
      <div className="w-3/12 mt-5">
      <Button title="Submit"/>
      </div>
    </form>
  );
}
