import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import './ManageService.css'
const ManageService = () => {
  const [Message, setMessage] = useState("");
  const[Price,setPrice] = useState("");
  const [Complaint, setComplaint] = useState([]);
  const[service,setService] = useState("");
  const[title,setTitle] = useState("");
  const [serviceData,setServiceData] = useState([]);
  const[extraserviceData,setextraserviceData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(()=>{
    axios.post("http://localhost:5000/getservice")
    .then((dt)=>{
      setServiceData(dt.data);
    }) 
    axios.post("http://localhost:5000/getextraservice")
    .then((dt)=>{
      setextraserviceData(dt.data);
    })
  })

  const handleAddService = (e) => {
    e.preventDefault();
    if (Message.length && title.length) {
      axios.post("http://localhost:5000/addservice",{
        title:title,message:Message
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
      setTitle("")
    } else {
      toast.error("All fields are mandatory !", {
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
  const removeService = (x)=>{
    axios.delete(`http://localhost:5000/deleteservice${x}`)
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
  const handleShow = (userID) => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMessage("");
    setTitle("");
    setPrice("");
  };
  const handleAddExtraService = (e)=>{
    e.preventDefault();
    if (Message.length && title.length && Price.length){
      axios.post("http://localhost:5000/addextraservice",{
        title:title,message:Message,price:Price
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
      setPrice("")
      setTitle("")
    }
    else{
      toast.error("All fields are mandatory !", {
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
  }

  const handleNum = (e) => {
 
    const check = /^[0-9\b]+$/;
    {
      if(check.test(e.target.value) && e.target.value.length<=10)
      {
        setPrice(e.target.value)
      }
    }
  }
  const removeExtraService = (x)=>{
    axios.delete(`http://localhost:5000/deleteextraservice${x}`)
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
  <>
 <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        MANAGE SERVICES
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
            Add Service
            <BsPencilSquare className="ms-1" />
          </h6>
          {
         serviceData.length>0? <Table striped bordered hover responsive>
         <thead>
           <tr className="text-center">
             <th>Index</th>
             <th>Name</th>
             <th>Description</th>
             <th>Delete</th>
           </tr>
         </thead>
         <tbody>
           {serviceData.map((e, i) => {
             return (
               <tr className="text-center" key={i}>
                 <td>{i + 1}</td>
                 <td>{e.title}</td>
                 <td>{e.description}</td>
                 <td>
                   <ImCross
                     style={{ cursor: "pointer" }}
                     className="fs-5 text-danger"
                     onClick={() => removeService(e.id)}
                   />
                 </td>
               </tr>
             );
           })}
         </tbody>
       </Table>:null
         } 
          <h6
            className="new-room"
            onClick={() => handleShow()}
          >
            Add Extra Service
            <BsPencilSquare className="ms-1" />
          </h6>
          {
         extraserviceData.length>0? <Table striped bordered hover responsive>
         <thead>
           <tr className="text-center">
             <th>Index</th>
             <th>Name</th>
             <th>Description</th>
             <th>Price</th>
             <th>Delete</th>
           </tr>
         </thead>
         <tbody>
           {extraserviceData.map((e, i) => {
             return (
               <tr className="text-center" key={i}>
                 <td>{i + 1}</td>
                 <td>{e.title}</td>
                 <td>{e.description}</td>
                 <td>₹{e.price}</td>
                 <td>
                   <ImCross
                     style={{ cursor: "pointer" }}
                     className="fs-5 text-danger"
                     onClick={() => removeExtraService(e.id)}
                   />
                 </td>
               </tr>
             );
           })}
         </tbody>
       </Table>:null
         } 
        </Container>
      </section>
      <div
        className="service-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Service Details
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
            <form className="roomform" onSubmit={handleAddService}>
              <div className="form-label-group">
              <input
                    type="text"
                    name="uroomid"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />  
                <textarea
                  id="message"
                  className="form-control rounded border-white mb-2 review-text-area"
                  rows={2}
                  cols={40}
                  name="Message"
                  placeholder="Service description"
                  autoComplete="False"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="addroom-btn">ADD</button>
            </form>
          </Container>
        </div>
      </div>

      <Offcanvas
          className="extra-service-ofset"
          placement="top"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">
              {" "}
              <h3 style={{ color: "#484848" }} className="manage-room">
                Extra Service Details
              </h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
            <form className="roomform" onSubmit={handleAddExtraService}>
              <div className="form-label-group">
              <input
                    type="text"
                    name="uroomid"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />  
                   <input
                    type="text"
                    name="price"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Price"
                    value={Price}
                    onChange={handleNum}
                  />  
                <textarea
                  id="message"
                  className="form-control rounded border-white mb-2 review-text-area"
                  rows={2}
                  cols={40}
                  name="Message"
                  placeholder="Service description"
                  autoComplete="False"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="addroom-btn">ADD</button>
            </form>
         
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
    </>
    </>
  )
}

export default ManageService