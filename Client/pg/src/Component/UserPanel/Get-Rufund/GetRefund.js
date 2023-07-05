import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
const GetRefund = () => {
  const[approve,setApprove] = useState();
  useEffect(()=>{
    const uid = sessionStorage.getItem("user-id");
    axios
    .post(`http://localhost:5000/cancellationdata${uid}`)
    .then((dt)=>{
      setApprove(dt.data[0].approve)
    })
  })
  return (
    <>
    <ToastContainer />
   <h3
     className="mt-2 manage-room text-center"
     data-aos="fade-down"
     data-aos-duration="700"
   >
      BOOKING REFUND
   </h3>
   <section
     className="booking-cancle-section"
     data-aos="zoom-in"
     data-aos-duration="1400"
   >
     <Container>
    <div className="cancel shadow">
     <h5 className="about-para mt-0 fs-3">Get Refund</h5>
     <p className="about-para mt-0 mx-3 fs-6">🥳congratulation..your booking cancellation request has been approved.your refund will be initiated within 5 days✅.</p>

    </div>
     </Container>
   </section>
 </>
  )
}

export default GetRefund