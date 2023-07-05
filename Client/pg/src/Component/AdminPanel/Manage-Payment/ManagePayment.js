import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
const ManagePayment = () => {
  const [data, setData] = useState([]);
  const [Servicedata, setServiceData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/bookingpayment")
      .then((dt) => setData(dt.data));
      axios.get("http://localhost:5000/servicepayment")
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

  const removeBookingPayment = (id)=>{
    axios.delete(`http://localhost:5000/removepayment${id}`)
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

  const removeServicePayment = (id)=>{
    axios.delete(`http://localhost:5000/removeservicepayment${id}`)
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
        MANAGE BOOKING PAYMENT
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
          <h6
            className="new-room mt-5"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            Manage Service Payment
            <BsPencilSquare className="ms-1" />
          </h6>
          <Table striped bordered hover responsive>
            <thead>
            <tr className="text-center">
                <th>Index</th>
                {/* <th>User id</th> */}
                <th>Room id</th>
                <th>Name</th>
                <th>Payment date</th>
                <th>Payment duration</th>
                <th>Payment</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr className="text-center" key={i}>
                    <td>{i + 1}</td>
                    {/* <td>{e.userid}</td> */}
                    <td>{e.roomid}</td>
                    <td>{e.uname}</td>
                    <td>{e.dop}</td>
                    <td>{e.duration}</td>
                    <td>₹{e.payment}/-</td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removeBookingPayment(e.id)}
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
            Manage Service Payment
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
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Index</th>
                {/* <th>User id</th> */}
                <th>Name</th>
                <th>Service</th>
                <th>Booking date</th>
                <th>Booking duration</th>
                <th>Price</th>
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
                    <td>₹{e.price}/-</td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removeServicePayment(e.id)}
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

export default ManagePayment