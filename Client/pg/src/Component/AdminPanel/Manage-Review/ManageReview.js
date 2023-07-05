import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ImCross } from "react-icons/im";
const ManageReview = () => {
  const [Review, setReview] = useState("");
  useEffect(()=>{
    axios.post("http://localhost:5000/getallreview")
    .then((dt)=>{
      setReview(dt.data)
    })
  })
  const removereview = (x)=>{
    axios.delete(`http://localhost:5000/deletereview${x}`)
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
        VIEW REVIEWS
      </h3>
      <section
        className="manage-room-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
         {
         Review.length>0? <Table striped bordered hover responsive>
         <thead>
           <tr>
             <th>Index</th>
             {/* <th>Id</th> */}
             <th>Name</th>
             <th>Date</th>
             <th>Message</th>
             {/* <th>Delete</th> */}
           </tr>
         </thead>
         <tbody>
           {Review.map((e, i) => {
             return (
               <tr key={i}>
                 <td>{i + 1}</td>
                 {/* <td>{e.uid}</td> */}
                 <td>{e.name}</td>
                 <td>{e.date}</td>
                 <td>{e.message}</td>
                 {/* <td>
                   <ImCross
                     style={{ cursor: "pointer" }}
                     className="fs-5 text-danger"
                     onClick={() => removereview(e.id)}
                   />
                 </td> */}
               </tr>
             );
           })}
         </tbody>
       </Table>:null
         }
        </Container>
      </section>
    </>
  )
}

export default ManageReview