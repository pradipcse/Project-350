import { createBrowserRouter } from "react-router-dom"; 
import ProtectedRoute from "../Private/Private";
import Header from "../../Components/Header/Header";
import Home from "../../Components/Home/Home";
import Footer from "../../Components/Footer/Footer";
import Login from "../../Components/login_reg/Login";
import User from "../../Components/User/User";
import Register from "../../Components/login_reg/Register";
import Category from "../../Components/Category/Category";
import Admin from "../../Components/Admin/PMGT";
import Seller from "../../Components/Seller/Seller";
import Products from "../../Components/Products/Products";
import Dashboard from "../../Components/Admin/Dashboard";
import PMGT from "../../Components/Admin/PMGT";
import DB from "../../Components/Admin/User/DB";
import RegisterAdmin from "../../Components/Admin/User/AdminRegister";
import SellerProd from "../../Components/Seller/SellerProd";
import SellerDB from "../../Components/Seller/SellerDB";
import Cart from "../../Components/Cart/Cart";
import ProductDetails from "../../Components/Products/ProductDetails";




// eslint-disable-next-line react-refresh/only-export-components
const Layout = ({ children }) => (
  <>
    <Header></Header>
    {children}
    <Footer></Footer>
  </> 
);

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout><Home></Home></Layout>
  },
  {path:"/register",element:<Layout><Register></Register></Layout>},
  {path:"/login",element:<Layout><Login></Login></Layout>},
  {path:"/user",element:<Layout><User></User></Layout>},
  {path:"/category",element:<Layout><Category></Category></Layout>},
  {path:"/admin",element:<Layout><Admin></Admin></Layout>},
  {path:"/sellerDB",element:<Layout><SellerDB></SellerDB></Layout>},
  {path:"/sellerDetails",element:<Layout><Seller></Seller></Layout>},
  {path:"/sellerProd",element:<Layout><SellerProd></SellerProd></Layout>},
  {path:"/adminDashboard",element:<Layout><Dashboard></Dashboard></Layout>},
  {path:"/admin/products",element:<Layout><PMGT></PMGT> </Layout>},
  {path:"/products",element:<Layout><Products></Products></Layout>},
  {path:"/products/:id",element:<Layout><ProductDetails></ProductDetails></Layout>},
  {path:"/admin/manage-users",element:<Layout><DB></DB></Layout>},
  {path:"/admin/manage-users/adminRegister",element:<Layout><RegisterAdmin></RegisterAdmin></Layout>},
  {path:"/cart",element:<Layout><Cart></Cart></Layout>},
]);

export default router;
