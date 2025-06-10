import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Remove ": any" type annotation here, since this is plain JS
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          SustShop
        </NavLink>

        <nav className="space-x-6 hidden md:block">
          <NavLink to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </NavLink>
          <NavLink to="/products" className="text-gray-700 hover:text-blue-500">
            Products
          </NavLink>
          <NavLink to="/cart" className="text-gray-700 hover:text-blue-500">
            Cart
          </NavLink>
          <NavLink to="/category" className="text-gray-700 hover:text-blue-500">
            Category
          </NavLink>
        </nav>

        <div className="space-x-4 hidden md:block">
          <NavLink to="/seller" className="text-sm text-gray-600 hover:text-blue-500">
            Seller
          </NavLink>
          <NavLink to="/adminDashboard" className="text-sm text-gray-600 hover:text-blue-500">
            Admin
          </NavLink>
          <NavLink to="/user" className="text-sm text-gray-600 hover:text-blue-500">
            User
          </NavLink>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer bg-transparent border-none"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="text-sm text-gray-600 hover:text-blue-500">
                Login
              </NavLink>
              <NavLink to="/register" className="text-sm text-gray-600 hover:text-blue-500">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
