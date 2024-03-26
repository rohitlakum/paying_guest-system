import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Demo from '../src/Demo'
import './App.css'
import About from './Component/About/About'
import Admin from './Component/AdminPanel/Admin'
import GenerateReport from './Component/AdminPanel/Generate-Report/GenerateReport'
import GiveNotice from './Component/AdminPanel/Give-Notice/GiveNotice'
import MakeRefund from './Component/AdminPanel/Make-Refund/MakeRefund'
import ManageComplaint from './Component/AdminPanel/Manage-Complaint/ManageComplaint'
import ManageFood from './Component/AdminPanel/Manage-Food/ManageFood'
import ManageGuest from './Component/AdminPanel/Manage-Guest/ManageGuest'
import ManagePayment from './Component/AdminPanel/Manage-Payment/ManagePayment'
import AdminProfile from './Component/AdminPanel/Manage-Profile/AdminProfile'
import Profile from './Component/AdminPanel/Manage-Profile/Profile'
import ManageRequest from './Component/AdminPanel/Manage-Request/ManageRequest'
import ManageReview from './Component/AdminPanel/Manage-Review/ManageReview'
import ManageRoom from './Component/AdminPanel/Manage-room/ManageRoom'
import ManageService from './Component/AdminPanel/Manage-service/ManageService'
import Contact from './Component/Contact/Contact'
import Dashboard from './Component/Dashboard/Dashboard'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login'
import Registration from './Component/Registration/Registration'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import Review from './Component/Review/Review'
import Condition from './Component/Rooms/Condition'
import Rooms from './Component/Rooms/Rooms'
import SelectBed from './Component/Rooms/SelectBed'
import Service from './Component/Services/Service'
import BookingCancelation from './Component/UserPanel/Booking-cancelation/BookingCancelation'
import GetRefund from './Component/UserPanel/Get-Rufund/GetRefund'
import GetServices from './Component/UserPanel/Get-Services/GetServices'
import MakeComplaints from './Component/UserPanel/Make-complaints/MakeComplaints'
import ViewFoodMenu from './Component/UserPanel/View-Food-Menu/ViewFoodMenu'
import ViewRoomDetails from './Component/UserPanel/View-Room-Detail/ViewRoomDetails'
import ViewService from './Component/UserPanel/View-Service/ViewService'
import WriteNotice from './Component/UserPanel/Write-Notice/WriteNotice'
import WriteReviews from './Component/UserPanel/Write-Reviews/WriteReviews'
import ScrollToTop from './ScrollToTop'

const App = () => {
  return (
    <>

    <BrowserRouter>
    
   <ScrollToTop/>
    <Routes>
      <Route path='/demo' element= {<Demo/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/review' element={<Review/>}/>
      <Route path='/Rooms' element={<Rooms/>} />
      <Route path='/selectbed' element={<SelectBed/>} />
      <Route path='/condition' element={<Condition/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registration' element={<Registration/>}  />
      <Route path='/resetpass/:id/:token' element={<ResetPassword/>} />  
      <Route path='/dashboard' element={<Dashboard/>} >
      <Route path='profile' element={<Profile/>} />
      <Route path='aprofile' element={<AdminProfile/>} />
         {/* Admin route start */}
         
      <Route path='manageroom' element={<ManageRoom/>} />
      <Route path='managefood' element={<ManageFood/>} />
      <Route path='managereview' element={<ManageReview/>} />
      <Route path='managecomplaint' element={<ManageComplaint/>} />  
      
      <Route path='manageservice' element={<ManageService/>} />
      <Route path='managerequest' element={<ManageRequest/>} />
      <Route path='managepayment' element={<ManagePayment/>} />
      <Route path='makerefund' element={<MakeRefund/>} />
      <Route path='givenotice' element={<GiveNotice/>} />
      <Route path='generatereport' element={<GenerateReport/>} />
      <Route path='guest' element={<ManageGuest/>} />
      <Route path='admin' element={<Admin/>}/>


           {/* Admin route End */}

        {/* User route start */}
        <Route path='viewroomdetails' element={<ViewRoomDetails/>} />
        <Route path='viewfoodmenu' element={<ViewFoodMenu/>} />
        <Route path='canclebooking' element={<BookingCancelation/>} />
        <Route path='viewservice' element={<ViewService/>} />
        <Route path='getrefund' element={<GetRefund/>} />
        <Route path='writereviews' element={<WriteReviews/>} />
        <Route path='makecomplaint' element={<MakeComplaints/>} />
        <Route path='getservice' element={<GetServices/>} />
        <Route path='writenotice' element={<WriteNotice/>} />


        {/* User route End */}
    
       </Route>
      
      <Route path='/*' element={<Navigate to='/'/>} />
    </Routes>

      {/* <Footer/> */}
    </BrowserRouter>

    </>
  )
}

export default App
