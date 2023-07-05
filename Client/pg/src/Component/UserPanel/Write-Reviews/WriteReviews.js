import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import "./WriteReview.css";
const WriteReviews = () => {
  const [Message, setMessage] = useState("");
  const [Review, setReview] = useState("");

  const[Name,setName] = useState("")
useEffect(()=>{
  const uid=sessionStorage.getItem("user-id")
    axios.post(`http://localhost:5000/userdata${uid}`)
    .then((dt)=>{
      setName(dt.data[0].name)
    })
    axios.post(`http://localhost:5000/getreview${uid}`)
    .then((dt)=>{
      setReview(dt.data)
    })
})
  const handleAddreview = (e) => {
    e.preventDefault();
    if (Message.length) {
      const id=sessionStorage.getItem("user-id")
      axios.post("http://localhost:5000/addreview",{
        id:id,name:Name,message:Message
      })
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
      setMessage("")
    } else {
      toast.error("Message fields is mandatory !", {
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
  };
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
        WRITE REVIEWS
      </h3>
      <section
        className="manage-room-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
          <h6
            className="new-room"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            Write Review
            <BsPencilSquare className="ms-1" />
          </h6>
         {
         Review.length>0? <Table striped bordered hover responsive>
         <thead>
           <tr>
             <th>Index</th>
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
      <div
        className="review-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Review Details
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Container>
            <form className="roomform" onSubmit={handleAddreview}>
              <div className="form-label-group">
                <textarea
                  id="message"
                  className="form-control rounded border-white mb-3 review-text-area"
                  rows={5}
                  cols={50}
                  name="Message"
                  placeholder="Enter Your Message"
                  autoComplete="False"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="addroom-btn">Add</button>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default WriteReviews;
