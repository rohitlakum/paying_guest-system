import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
// import "./ManageGuest.css";
const ManageGuest = () => {
  const [data, setData] = useState([]);
  const [Servicedata, setServiceData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/bookingdata")
      .then((dt) => setData(dt.data));
      axios.get("http://localhost:5000/allservicebuyer")
      .then((dt) => setServiceData(dt.data));
  });
  const removeRoom = (x, roomid) => {
    axios.delete(`http://localhost:5000/deleteguest${x}`).then((dt) => {
      if (dt.status === 200) {
        axios
          .post("http://localhost:5000/increasevacancy", {
            id: roomid,
          })
          .then((dt) => {
            if (dt.status === 200) {
              axios
                .post(`http://localhost:5000/resetisbooked${x}`)
                .then((dt) => {
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
                });
            }
          });
      }
    });
  };

  const removeServiceUser = (id)=>{
    axios.delete(`http://localhost:5000/removeserviceuser${id}`)
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
        MANAGE GUEST
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
          <h6
            className="new-room"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            Manage Service Users
            <BsPencilSquare className="ms-1" />
          </h6>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Index</th>
                <th>Room no</th>
                {/* <th>User id</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Mobile no</th>
                <th>Aadharcard id</th>
                <th>Booking date</th>
                <th>Booking duration</th>
                <th>Address</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.roomno}</td>
                    {/* <td>{e.userid}</td> */}
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.pno}</td>
                    <td>{e.aadhar}</td>
                    <td>{e.bdate}</td>
                    <td>{e.duration}</td>
                    <td>{e.address}</td>
                    <td>
                      <img
                        style={{ width: 80, height: 53 }}
                        className="img-fluid"
                        src={`/img/${e.image}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removeRoom(e.userid, e.roomno)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </section>
      <div
        className="view-notice offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Manage Service Users
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
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Index</th>
                {/* <th>User id</th> */}
                <th>Name</th>
                <th>Service</th>
                <th>Booking date</th>
                <th>Booking duration</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Servicedata.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {/* <td>{e.uid}</td> */}
                    <td>{e.name}</td>
                    <td>{e.service}</td>
                    <td>{e.bdate}</td>
                    <td>{e.duration}</td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removeServiceUser(e.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageGuest;
