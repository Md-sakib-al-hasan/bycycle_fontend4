import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/button/Button";
import { Toaster,toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { uploadImageToImgBB } from "../../../hook/uploadimgeintoimgbd";
import { useAddproductMutation } from "../../../redux/features/product/productApi";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  model: z.string().min(2,"Enter the Product Model"),
  company: z.string().min(2,"ProductCompanyname"),
  price:z.string(),
  type: z.string(),
  rating:z.string()
  .min(1, "Enter product rating") 
  .refine(value => ['1', '2', '3', '4',"5"].includes(value), {
    message: 'Invalid product type. Choose from 1, 2, 3,4, or 5.',
  }),
  size: z.string()
  .min(1, "Enter product type") 
  .refine(value => ['S', 'M', 'L', 'XL'].includes(value), {
    message: 'Invalid product type. Choose from S, M, L, or XL.',
  }),
  img: z.instanceof(FileList).optional(),
  quantity:z.string(),
});

export default function Addproduct() {
  const [addprouct,] = useAddproductMutation()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: FieldValues) => {
 

    const imgUrl = await uploadImageToImgBB(data.img?.[0]);
    if (!imgUrl) {
        toast.error("Failed to upload image");
        return;
    }

    const newdata = { ...data, img: imgUrl ,quantity:Number(data.quantity) };
    addprouct(newdata)
    toast.success('add prouct in successfully');
      navigate('/admin/Product')
    
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
            <label>Model:</label>
            <input {...register("model")} className="border p-2 w-full  rounded-md focus:outline-none" />
            {errors.model && <p className="text-red-500 text-sm">{String(errors.model.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Company:</label>
            <input  {...register("company")} className="border p-2 w-full  rounded-md focus:outline-none" />
            {errors.company && <p className="text-red-500 text-sm">{String(errors.company.message)}</p>}
        </div>

        <div className="space-y-2">
            <label>Price:</label>
            <input type="number" {...register("price")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.price && <p className="text-red-500">{String(errors.price.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Rating:</label>
            <input type="number" {...register("rating")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.rating && <p className="text-red-500">{String(errors.rating.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Type:</label>
            <input {...register("type")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.type && <p className="text-red-500 text-sm">{String(errors.type.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Size:</label>
            <input {...register("size")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.size && <p className="text-red-500 text-sm">{String(errors.size.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Quantity:</label>
            <input type="number" {...register("quantity")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.quantity && <p className="text-red-500 text-sm">{String(errors.quantity.message)}</p>}
        </div>
        <div className="space-y-2">
            <label>Product Image:</label>
            <input type="file" {...register("img")} className="border p-2 w-full rounded-md focus:outline-none" />
            {errors.img && <p className="text-red-500 text-sm">{String(errors.img.message)}</p>}
        </div>
      </div>
      <div className="w-3/12 mt-5">
      <Button title="Submit"/>
      </div>
    </form>
  );
}
