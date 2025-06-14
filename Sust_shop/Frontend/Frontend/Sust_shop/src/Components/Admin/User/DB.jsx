import React, { useState } from 'react'
import RegisterAdmin from './AdminRegister';
import DeleteUsers from './DeleteUsers';  // you need to create this

const TABS = [
  { key: 'admin', label: 'Admin Registration' },
  { key: 'users', label: 'Delete Users' }
];

export default function DB() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div style={{ padding: 20 }}>
      <h1>User Management</h1>

      <div style={{ marginBottom: 20 }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              marginRight: 10,
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.key ? '#007bff' : '#ccc',
              color: activeTab === tab.key ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'admin' && <RegisterAdmin></RegisterAdmin>}
        {activeTab === 'users' && <DeleteUsers />}
      </div>
    </div>
  );
}
