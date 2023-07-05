import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminPanel from '../AdminPanel/AdminPanel'
import Login from '../Login/Login'
import UserPanel from '../UserPanel/UserPanel'
import Rooms from '../Rooms/Rooms'
const Dashboard = () => {
   const location = useLocation();
  //  const navigate = useNavigate();
   const[isadmin,setIsAdmin] = useState("")
 useEffect(()=>{
  setIsAdmin(JSON.parse(sessionStorage.getItem('user-info')))
 },[])


  return (
    <>
    {  sessionStorage.getItem('user-info')?
    sessionStorage.getItem('isbooked') ?
      isadmin===1 ? <AdminPanel/> : <UserPanel/> 
      : <Rooms/>
      : <Login/>
    }
   
    </>
  )
}

export default Dashboard