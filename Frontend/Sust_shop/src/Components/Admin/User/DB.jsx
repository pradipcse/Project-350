import React from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { key: 'admin', label: 'Admin User', path: '/admin/manage-users/admin-user' },
  { key: 'user', label: 'Normal User', path: '/users/normal' },
  { key: 'seller', label: 'Seller User', path: '/users/seller' },
];

export default function DB() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>User Management</h1>
      <div style={{ marginBottom: 20 }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => navigate(tab.path)}
            style={{
              marginRight: 10,
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
