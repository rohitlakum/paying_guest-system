import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./BookingCancelation.css";
const BookingCancelation = () => {
  const[approve,setApprove] = useState();
  useEffect(()=>{
    const uid = sessionStorage.getItem("user-id");
    axios
    .post(`http://localhost:5000/cancellationdata${uid}`)
    .then((dt)=>{
      setApprove(dt.data[0].approve)
    })
  })
  const handleBookingCancel = ()=>{
    const uid = sessionStorage.getItem("user-id");
    axios
    .post(`http://localhost:5000/addbokingcancel${uid}`)
    .then((dt)=>{
      if(dt.status===200){
        toast.success(`${dt.data.Message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else{
        toast.error(`${dt.data.Error}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
  }
  return (
    <>
       <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        BOOKING CANCELATION
      </h3>
      <section
        className="booking-cancle-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
       <div className="cancel shadow">
        <h5 className="about-para mt-0 fs-3">Are you sure?</h5>
        <p className="about-para mt-0 mx-3 fs-6">Are you sure you want to cancel this booking? You will not be able to undo this action.</p>
      {
        approve===0 || approve ===1?  <p className="mt-0">Status :{
          approve===0?<span className="text-danger"> Not Approved</span>:approve===1?<span className="text-success"> Approved</span>:null
}</p>:null
      }
       <button className="cancel-btn mb-2" onClick={handleBookingCancel}>Confirm</button>
       </div>
        </Container>
      </section>
    </>
  )
}

export default BookingCancelation