
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import About from "../pages/about/About";
import Contact_us from "../pages/contact_us/Contact_us";
import Main from "../layout/main/Main";
import Cart from "../pages/cart/Cart";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Dashboard from "../pages/adminDashboard/Dashboard";
import DashboardHome from "../pages/adminDashboard/component/DashboardHome";
import Product from "../pages/adminDashboard/component/Product";
import Order from "../pages/adminDashboard/component/Order";
import User from "../pages/adminDashboard/component/User";
import Reviews from "../pages/adminDashboard/component/Reviews";
import Logout from "../pages/adminDashboard/component/Logout";
import Customer from "../pages/Customer/Customer";
import WhiteOrder from "../pages/Customer/Component/whisorder";
import Myprofile from "../pages/Customer/Component/Myprofile";
import Myorder from "../pages/Customer/Component/Myorder";
import NotFound from "../components/notFound/NotFound";
import AddUser from "../pages/adminDashboard/component/AddUser";
import PrivateRotue from "../privateRoute/PrivateRotue";
import EditProfile from "../components/editeProfile/EditeProfile";
import Profile from "../pages/adminDashboard/component/Profile";
import Addproduct from "../pages/adminDashboard/component/Addproduct";
import Protected from "../privateRoute/Protected";











export const router = createBrowserRouter([
  {
    path:"/",
    element:<Main/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/shop",
        element:<Shop/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact_us',
        element:<Contact_us/>
      },
      {
        path:'/cart/:id',
        element:<Protected><Cart/></Protected>
      },
      {
        path:'/productDetails',
        element:<ProductDetails/>
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path:'customer',
        element:<PrivateRotue role="customer"><Customer /></PrivateRotue>,
        children:[
         {
          path:'whiteList',
          element:<WhiteOrder/>
        },
        {
          path:'',
          element:<Myprofile/>
        },
        {
        
          path:'editprofile',
          element:<EditProfile/>
        },
        {
          path:'order',
          element:<Myorder/>
        },
       
      ],
      },
      {
        path:'admin',
      element:<PrivateRotue role="admin" ><Dashboard/></PrivateRotue>,
      children:[
        {
          path:'',
          element:<DashboardHome/>
        },
        {
        
          path:'editprofile',
          element:<EditProfile/>
        },
        {
          path:'Product',
          element:<Product/>
        },
        {
          path:'Order',
          element:<Order/>
        },
        {
          path:'User',
          element:<User/>
        },
        {
          path:'Reviews',
          element:<Reviews/>
        },
        {
          path:'Profile',
          element:<Profile/>
        },
        {
          path:'Logout',
          element:<Logout/>
        },
        {
          path:'adduser',
          element:<AddUser/>
        },
        {
          path:'editeUser',
          element:<EditProfile/>,
        },
        {
          path:'addproduct',
          element:<Addproduct/>
        },
        
      ]
      }

    ]
  }
]);