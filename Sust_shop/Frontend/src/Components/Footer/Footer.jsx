// src/components/Footer.jsx

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">ShopX</h2>
          <p className="text-sm text-gray-300">
            Your one-stop shop for electronics, fashion, and more. Trusted by millions worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-gray-300">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
            <li><Link to="/account" className="hover:text-gray-300">My Account</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/help" className="hover:text-gray-300">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-gray-300">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-gray-300">Shipping Info</Link></li>
            <li><Link to="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>Email: support@shopx.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 123 Commerce St, New York, NY</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ShopX. All rights reserved.
      </div>
    </footer>
  );
}
