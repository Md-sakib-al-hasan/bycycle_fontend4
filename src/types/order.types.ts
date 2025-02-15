export type TOrder  ={
    email: string;
    img: string;
    name: string;
    paidStatus: "complted" | "canceled"  | "failed";
    payment: string; 
    phone: string;
    price: string; 
    productId: string;
    productname: string;
    quantity: string; 
    tranId: string;
    type: string;
    _id: string;
    sellShopName:string;
  }