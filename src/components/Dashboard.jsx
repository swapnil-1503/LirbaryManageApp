
import React from 'react';
import Sidebar from './components/Sidebar'; 

let Dashboard = ({ onLogOut }) => { // Dashboard receives onLogOut as a prop
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onLogOut={onLogOut} /> {/* Pass onLogOut to Sidebar */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h2>Welcome to the Dashboard!</h2>
        {/* ... rest of your dashboard content */}
      </div>
    </div>
  );
};

export default Dashboard;