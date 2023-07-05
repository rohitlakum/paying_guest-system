import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { BsEye } from "react-icons/bs";
import './GiveNotice.css'
const GiveNotice = () => {
  const [Message, setMessage] = useState("");
  const [AdminData, setAdminData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/adminnotice`).then((dt) => {
      setAdminData(dt.data);
    });
    
    axios.get(`http://localhost:5000/usernotice`).then((dt) => {
      setUserData(dt.data);
    });
  });
  const handleAddNotice = (e) => {
    e.preventDefault();

    if (Message.length) {
      const id = sessionStorage.getItem("user-id");
      const admin = sessionStorage.getItem("user-info");
      axios
        .post("http://localhost:5000/addnotice", {
          id: id,
          message: Message,
          admin: admin,
        })
        .then((dt) => {
          if (dt.status === 200) {
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
        });
      setMessage("");
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
  const handleShow = () => {
     setShow(true)
  };

  const handleClose = () => {
    setShow(false);
    
  };
  const removeComplaint = (x)=>{
    axios.delete(`http://localhost:5000/deletenotice${x}`)
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
        GIVE NOTICE
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
            Write Notice
            <BsPencilSquare className="ms-1" />
          </h6>    
          <h6
            className=" ms-2 new-room"
            onClick={() => handleShow()}
          >
            View Notice
            <BsEye className="ms-1" />
          </h6>
          <br></br>
         <h3
        className="mt-2 manage-room text-center mb-4"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        YOUR NOTICES
      </h3>
          {AdminData.length > 0 ? (
            <div>
              {" "}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Date</th>
                    <th>Message</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {AdminData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e.date}</td>
                        <td>{e.message}</td>
                        <td>
                          <ImCross
                            style={{ cursor: "pointer" }}
                            className="fs-5 text-danger"
                            onClick={() => removeComplaint(e.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <hr></hr>
            </div>
          ) : null}


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
            Notice Details
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
            <form className="roomform" onSubmit={handleAddNotice}>
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
              <button className="addroom-btn">SEND</button>
            </form>
          </Container>
        </div>
      </div>

      <Offcanvas
          className="view-notice"
          placement="top"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">
              {" "}
              <h3 style={{ color: "#484848" }} className="manage-room">
                View Guest Notice
              </h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
            {UserData.length > 0 ? (
            <div>
    
              {" "}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Index</th>
                    {/* <th>Id</th> */}
                    <th>Name</th>
                    <th>Date</th>
                    <th>Message</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {UserData.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        {/* <td>{e.uid}</td> */}
                        <td>{e.name}</td>
                        <td>{e.date}</td>
                        <td>{e.message}</td>
                        <td>
                          <ImCross
                            style={{ cursor: "pointer" }}
                            className="fs-5 text-danger"
                            onClick={() => removeComplaint(e.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <hr></hr>
            </div>
          ) : null}
        
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  );
};

export default GiveNotice;
