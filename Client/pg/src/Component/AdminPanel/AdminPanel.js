import Admin from '../AdminPanel/Admin'
import React from 'react'
import { Outlet } from 'react-router-dom'
const AdminPanel = () => {
  
  return (
    <>
      <Admin />
      <Outlet />
    </>
  );
};

export default AdminPanel;
