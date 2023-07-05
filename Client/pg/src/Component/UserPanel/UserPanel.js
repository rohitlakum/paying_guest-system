import React from 'react'
import { Outlet } from 'react-router-dom'
import User from './User'
const AdminPanel = () => {
  
  return (
    <>
    <User/>
      <Outlet />
    </>
  );
};

export default AdminPanel;
