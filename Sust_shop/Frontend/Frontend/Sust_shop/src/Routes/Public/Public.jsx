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
import Orders from "../../Components/Orders/Orders";
import CarouselAdmin from "../../Components/Admin/CaurosleAdmin";
import FreeProduct from "../../Components/FreeProduct/FreeProduct";
import FreeProductMgt from "../../Components/FreeProduct/FreeProductMgt";
import SearchPage from "../../Components/Search/SearchPage";
import AdminOrderMgt from "../../Components/Admin/AdminOrderMgt";

// eslint-disable-next-line react-refresh/only-export-components
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/register",
    element: <Layout><Register /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/user",
    element: (
      <Layout>
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/category",
    element: <Layout><Category /></Layout>,
  },

  // Admin protected routes
  {
    path: "/admin",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <Admin />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/adminDashboard",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <Dashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <PMGT />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin/manage-users",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <DB />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin/manage-orders",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminOrderMgt />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin/manage-caurosel",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <CarouselAdmin />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/admin/manage-users/adminRegister",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["admin"]}>
          <RegisterAdmin />
        </ProtectedRoute>
      </Layout>
    ),
  },

  // Seller protected routes
  {
    path: "/sellerDB",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["seller"]}>
          <SellerDB />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/sellerDetails",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["seller"]}>
          <Seller />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/sellerProd",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["seller"]}>
          <SellerProd />
        </ProtectedRoute>
      </Layout>
    ),
  },

  // Routes for any authenticated user
  {
    path: "/orders",
    element: (
      <Layout>
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      </Layout>
    ),
  },

  // Public routes (no protection)
  {
    path: "/products",
    element: <Layout><Products /></Layout>,
  },
  {
    path: "/products/:id",
    element: <Layout><ProductDetails /></Layout>,
  },
  {
    path: "/free-products",
    element: <Layout><FreeProduct /></Layout>,
  },
  {
    path: "/free-products-mgt",
    element: <Layout><FreeProductMgt /></Layout>,
  },
  {
    path: "/main/products/search",
    element: <Layout><SearchPage /></Layout>,
  },
]);

export default router;
