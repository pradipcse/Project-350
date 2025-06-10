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
import Admins from "../../Components/Admin/User/Admins";




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
  {path:"/seller",element:<Layout><Seller></Seller></Layout>},
  {path:"/adminDashboard",element:<Layout><Dashboard></Dashboard></Layout>},
  {path:"/admin/products",element:<Layout><PMGT></PMGT> </Layout>},
  {path:"/products",element:<Layout><Products></Products></Layout>},
  {path:"/admin/manage-users",element:<Layout><DB></DB></Layout>},
  {path:"/admin/manage-users/admin-user",element:<Layout><Admins></Admins></Layout>}

]);

export default router;
