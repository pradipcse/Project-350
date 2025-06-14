import React, { useState } from 'react';
import Seller from './Seller'; // Adjust the path as needed
import SellerProd from './SellerProd'; // Adjust the path as needed
import SellerOrders from './SellerOrders'; // Import your order management component

const SellerDB = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-center md:text-left">Seller Dashboard</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Seller Profile
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Product Management
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Order Management
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        {activeTab === 'profile' && <Seller />}
        {activeTab === 'products' && <SellerProd />}
        {activeTab === 'orders' && <SellerOrders />}
      </div>
    </div>
  );
};

export default SellerDB;
