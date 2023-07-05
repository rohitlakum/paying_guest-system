import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container, Table, Offcanvas } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./GenerateReport.css";
// import {useReactToPrint} from 'react-to-print'
import { TbFileInvoice } from "react-icons/tb";
const GenerateReport = () => {
  const bookingReportRef = useRef();
  const ServiceReportRef = useRef();
  const paymentRef = useRef();
  const serviceRef = useRef();
  const RoomRef = useRef();  
 
  const[first,setFirst]=useState("")
  const[first1,setFirst1]=useState("")
  const[second,setSecond]=useState("")
  const[second1,setSecond1]=useState("")
  const[third,setThird]=useState("")
  const[third1,setThird1]=useState("")
  const[fourth,setfourth]=useState("")
  const[fourth1,setfourth1]=useState("")
  const [startDate, setStartDate] = useState("");
  const [start, setStart] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Servicestart, setServiceStart] = useState("");
  const [ServiceUserstart, setServiceUserStart] = useState("");
  const [ServiceUserEnd, setServiceUserEnd] = useState("");
  const [Serviceend, setServiceend] = useState("");
  const [ServiceendDate, setServiceEndDate] = useState("");
  const [ServiceStartDate, setServiceStartDate] = useState("");
  const[userStartDate,setUserStartDate] = useState("")
  const[userEndDate,setUserEndDate] = useState("")
  const [end, setEnd] = useState("");
  const [Bdata, setBdata] = useState([]);
  const [Sdata, setSdata] = useState([]);
  const [show, setShow] = useState(false);
  const [spaymentshow, setspaymentShow] = useState(false);
  const[serviceShow,setServiceShow] = useState(false);
  const[serviceUser,setServiceUser]= useState("");
  const[ServicUserStartDate,setServiceUserStartDate] = useState("")
  const[ServicUserEndDate,setServiceUserEndDate] = useState("")
const[showRoom,setShowRoom]=useState(false);
const[roomdDate,setRoomData] = useState([]);
  const handleClosePayment = () => setspaymentShow(false);
  const handleShowPayment = () => setspaymentShow(true);

  const handleShowService = () =>setServiceShow(true);
  const handleCloseService = () =>setServiceShow(false);
  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tday}-${tmonth}-${tyear}`;
  const handleShowRoom = () =>{
 axios
      .get("http://localhost:5000/getroom")
      .then((dt) => setRoomData(dt.data));
    setShowRoom(true)
  };
  const handleCloseRoom = () =>setShowRoom(false);

  const[PaymentStart,setPaymentStart] = useState("")
  const[PaymentEnd,setPaymentEnd] = useState("")
  const[Smsg,setSmsg] = useState("")
  const[Emsg,setEmsg] = useState("")
  const[serviceData,setServiceData] = useState([]);
  const[userData,setUsersData] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => bookingReportRef.current,
    documentTitle: "Booking-Report",
    onAfterPrint: () => {
      toast.success("Report downloaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  const handleServicePrint = useReactToPrint({
    content: () => ServiceReportRef.current,
    documentTitle: "BookingPayment-Report",
    onAfterPrint: () => {
      toast.success("Report downloaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handlePaymentPrint = useReactToPrint({
    content: () => paymentRef.current,
    documentTitle: "ServicePayment-Report",
    onAfterPrint: () => {
      toast.success("Report downloaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
   const handleUserPrint = useReactToPrint({
    content: () => serviceRef.current,
    documentTitle: "ServiceUser-Report",
    onAfterPrint: () => {
      toast.success("Report downloaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  const handleRoomPrint = useReactToPrint({
    content: () => RoomRef.current,
    documentTitle: "Room-Report",
    onAfterPrint: () => {
      toast.success("Report downloaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const todayObject = new Date(startDate);
    let tday = todayObject.getDate();
    let tmonth = todayObject.getMonth() + 1;
    let tyear = todayObject.getFullYear();
    const today = `${tday}-${tmonth}-${tyear}`;

    const todayObject1 = new Date(endDate);
    let tday1 = todayObject1.getDate();
    let tmonth1 = todayObject1.getMonth() + 1;
    let tyear1 = todayObject1.getFullYear();
    const today1 = `${tday1}-${tmonth1}-${tyear1}`;

    setFirst(today)
    setFirst1(today1)
    if (start.length && end.length) {
      axios
        .post("http://localhost:5000/bookingreport", {
          startDate: startDate,
          endDate: endDate,
        })
        .then((dt) => {
          if (dt.status === 200) {
            setBdata(dt.data);
          } else {
            toast.error(`${dt.data.Message}`, {
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
  const handleshow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const todayObject = new Date(ServiceStartDate);
    let tday = todayObject.getDate();
    let tmonth = todayObject.getMonth() + 1;
    let tyear = todayObject.getFullYear();
    const today = `${tday}-${tmonth}-${tyear}`;

    const todayObject1 = new Date(ServiceendDate);
    let tday1 = todayObject1.getDate();
    let tmonth1 = todayObject1.getMonth() + 1;
    let tyear1 = todayObject1.getFullYear();
    const today1 = `${tday1}-${tmonth1}-${tyear1}`;

    setSecond(today)
    setSecond1(today1)
    if (Servicestart.length && Serviceend.length) {
      axios
        .post("http://localhost:5000/servicereport", {
          startDate: ServiceStartDate,
          endDate: ServiceendDate,
        })
        .then((dt) => {
          if (dt.status === 200) {
            // console.log(dt.data)
            setSdata(dt.data);
          } else {
            toast.error(`${dt.data.Message}`, {
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

  const handlespaymentSubmit = (e)=>{
    e.preventDefault();
    const todayObject = new Date(PaymentStart);
    let tday = todayObject.getDate();
    let tmonth = todayObject.getMonth() + 1;
    let tyear = todayObject.getFullYear();
    const today = `${tday}-${tmonth}-${tyear}`;

    const todayObject1 = new Date(PaymentEnd);
    let tday1 = todayObject1.getDate();
    let tmonth1 = todayObject1.getMonth() + 1;
    let tyear1 = todayObject1.getFullYear();
    const today1 = `${tday1}-${tmonth1}-${tyear1}`;

    setThird(today)
    setThird1(today1)
    if (Smsg.length && Emsg.length) {
     
      axios
        .post("http://localhost:5000/spaymentreport", {
          startDate: PaymentStart,
          endDate: PaymentEnd,
        })
        .then((dt) => {
          setServiceData(dt.data);
          if (dt.status === 200) {
            // console.log(dt.data)
            setSdata(dt.data);
          } else {
            toast.error(`${dt.data.Message}`, {
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
  }

  const handleServiceUserSubmit = (e)=>{
    e.preventDefault();
    const todayObject = new Date(userStartDate);
    let tday = todayObject.getDate();
    let tmonth = todayObject.getMonth() + 1;
    let tyear = todayObject.getFullYear();
    const today = `${tday}-${tmonth}-${tyear}`;

    const todayObject1 = new Date(userEndDate);
    let tday1 = todayObject1.getDate();
    let tmonth1 = todayObject1.getMonth() + 1;
    let tyear1 = todayObject1.getFullYear();
    const today1 = `${tday1}-${tmonth1}-${tyear1}`;

    setfourth(today)
    setfourth1(today1)
    if (ServiceUserstart.length && ServiceUserEnd.length) {
      axios
        .post("http://localhost:5000/serviceuserreport", {
          startDate: userStartDate,
          endDate:userEndDate,
        })
        .then((dt) => {
          if (dt.status === 200) {
            setUsersData(dt.data);
          } else {
            toast.error(`${dt.data.Message}`, {
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
  }
  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        GENERATE REPORT
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
          <div></div>
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 py-1 px-2 rounded"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            Booking Report
            <TbFileInvoice className="ms-1 fs-5" />
          </button>
          <br></br>
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 mt-3 py-1 px-2 rounded"
            onClick={() => handleshow()}
          >
            Booking Payment Report
            <TbFileInvoice className="ms-1 fs-5" />
          </button>
          <br></br>
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 mt-3 py-1 px-2 rounded"
            onClick={handleShowPayment}
          >
            Service Payment Report
            <TbFileInvoice className="ms-1 fs-5" />
          </button>
          <br></br>
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 mt-3 py-1 px-2 rounded"
            onClick={handleShowService}
          >
            Service Users Report
            <TbFileInvoice className="ms-1 fs-5" />
          </button>
          <br></br>
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 mt-3 py-1 px-2 rounded"
            onClick={handleShowRoom}
          >
            Room Report
            <TbFileInvoice className="ms-1 fs-5" />
          </button>
        </Container>
      </section>
 <Offcanvas className="booking-report" placement="top" show= 
      {spaymentshow} onHide={handleClosePayment} >
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Service Payment Report
            </h3>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
              <form className="roomform" onSubmit={handlespaymentSubmit}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => {
                    setPaymentStart(date);
                    setSmsg("Done");
                  }}
                  selected={PaymentStart}
                  placeholderText="From date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="form-control room-control ps-3 mb-1"
                  onChange={(date) => {
                    setPaymentEnd(date);
                    setEmsg("Done");
                  }}
                  selected={PaymentEnd}
                  placeholderText="To date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button className="addroom-btn">Get Data</button>
            </form> 
            {serviceData.length > 0 ? (
              <div>
                {" "}
                <div ref={paymentRef} className="text-center ">
                <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          <br />
                          <b>From Date  {fourth}</b>     <br />
                          <b>To Date  {fourth1}</b>
                          
                        </p>
                      
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Service Payment Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        {/* <th>User Id</th> */}
                        <th>Name</th>
                        <th>Service</th>
                        <th>Booking Date</th>
                        <th>Duration</th>
                        <th>Amount</th>
                      </tr>
                      {serviceData.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            {/* <td>{e.uid}</td> */}
                            <td>{e.name}</td>
                            <td>{e.service}</td>
                            <td>{e.bdate}</td>
                            <td>{e.duration}</td>
                            <td>₹{e.price}/-</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handlePaymentPrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
        </Offcanvas.Body>
      </Offcanvas>
      <div
        className="booking-report offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Generate Booking Report
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
            <form className="roomform" onSubmit={handleBookingSubmit}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => {
                    setStartDate(date);
                    setStart("Done");
                  }}
                  selected={startDate}
                  placeholderText="From date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="form-control room-control ps-3 mb-1"
                  onChange={(date) => {
                    setEndDate(date);
                    setEnd("Done");
                  }}
                  selected={endDate}
                  placeholderText="To date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button className="addroom-btn">Get Data</button>
            </form>
            {Bdata.length > 0 ? (
              <div>
                {" "}
                <div ref={bookingReportRef} className="text-center ">
                  {/* <h3
                    className="mt-2 manage-room text-center"
                    data-aos="fade-down"
                    data-aos-duration="700"
                  >
                    Booking Report
                  </h3>
                  <Table striped bordered hover responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>Room no</th>
                        <th>Name</th>
                        <th>Pno</th>
                        <th>Email</th>
                        <th>Bdate</th>
                        <th>Duration</th>
                        <th>Address</th>
                        <th>Image</th>
                      </tr>
                      {Bdata.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{e.roomno}</td>
                            <td>{e.name}</td>
                            <td>{e.pno}</td>
                            <td>{e.email}</td>
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table> */}
                   <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          <br />
                          <b>From Date : {first}</b>
                          <br></br>
                          <b>To Date : {first1}</b>
                          
                        </p>
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Booking Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>Room no</th>
                        <th>Name</th>
                        <th>Pno</th>
                        <th>Email</th>
                        <th>Bdate</th>
                        <th>Duration</th>
                        <th>Address</th>
                        <th>Image</th>
                      </tr>
                      {Bdata.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{e.roomno}</td>
                            <td>{e.name}</td>
                            <td>{e.pno}</td>
                            <td>{e.email}</td>
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
                          </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handlePrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
          </Container>
        </div>
      </div>

      <Offcanvas
        className="booking-report"
        placement="top"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Booking Payment Report
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <form className="roomform" onSubmit={handleServiceSubmit}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => {
                    setServiceStartDate(date);
                    setServiceStart("Done");
                  }}
                  selected={ServiceStartDate}
                  placeholderText="From date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="form-control room-control ps-3 mb-1"
                  onChange={(date) => {
                    setServiceEndDate(date);
                    setServiceend("Done");
                  }}
                  selected={ServiceendDate}
                  placeholderText="To date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button className="addroom-btn">Get Data</button>
            </form>
            {Sdata.length > 0 ? (
              <div>
                {" "}
                <div ref={ServiceReportRef} className="text-center ">
                <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          <br />
                          <b>From Date : {second}</b><br></br>
                          <b>To Date : {second1}</b> 
                        </p>
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Booking Payment Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        <th>User Id</th>
                        <th>Room No</th>
                        <th>Name</th>
                        <th>Dop</th>
                        <th>Duration</th>
                        <th>Rent</th>
                        <th>Deposit</th>
                        <th>Total</th>
                      </tr>
                      {Sdata.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{e.userid}</td>
                            <td>{e.roomid}</td>
                            <td>{e.uname}</td>
                            <td>{e.dop}</td>
                            <td>{e.duration}</td>
                            <td>₹{e.payment / 2}/-</td>
                            <td>₹{e.payment / 2}/-</td>
                            <td>₹{e.payment}/-</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handleServicePrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>

       <Offcanvas className="booking-report" placement="top" show={spaymentshow} onHide={handleClosePayment} >
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Service Payment Report
            </h3>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
              <form className="roomform" onSubmit={handlespaymentSubmit}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => {
                    setPaymentStart(date);
                    setSmsg("Done");
                  }}
                  selected={PaymentStart}
                  placeholderText="From date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="form-control room-control ps-3 mb-1"
                  onChange={(date) => {
                    setPaymentEnd(date);
                    setEmsg("Done");
                  }}
                  selected={PaymentEnd}
                  placeholderText="To date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button className="addroom-btn">Get Data</button>
            </form> 
            {serviceData.length > 0 ? (
              <div>
                {" "}
                <div ref={paymentRef} className="text-center ">
                <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          {/* <br />
                          <b>Report Date : {today}</b> */}
                          <br/>
                        <b>From Date : {third}</b>
                        <br/>
                        <b>To Date : {third1}</b>
                        </p>
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Service Payment Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        {/* <th>User Id</th> */}
                        <th>Name</th>
                        <th>Service</th>
                        <th>Booking Date</th>
                        <th>Duration</th>
                        <th>Amount</th>
                      </tr>
                      {serviceData.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            {/* <td>{e.uid}</td> */}
                            <td>{e.name}</td>
                            <td>{e.service}</td>
                            <td>{e.bdate}</td>
                            <td>{e.duration}</td>
                            <td>₹{e.price}/-</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handlePaymentPrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas className="booking-report" placement="top" show={serviceShow} onHide={handleCloseService} >
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Service Users Report
            </h3>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
              <form className="roomform" onSubmit={handleServiceUserSubmit}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => {
                    setUserStartDate(date);
                    setServiceUserStart("Done");
                  }}
                  selected={userStartDate}
                  placeholderText="From date"
                  dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                  className="form-control room-control ps-3 mb-1"
                  onChange={(date) => {
                    setUserEndDate(date);
                    setServiceUserEnd("Done");
                  }}
                  selected={userEndDate}
                  placeholderText="To date"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button className="addroom-btn">Get Data</button>
            </form> 
            {userData.length > 0 ? (
              <div>
                {" "}
                <div ref={serviceRef} className="text-center ">
                <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          <br />
                          <b>From Date : {fourth}</b><br />
                          <b>To Date : {fourth1}</b>
                        </p>
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Service Users Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                        <th>No</th>
                        {/* <th>User Id</th> */}
                        <th>Name</th>
                        <th>Service</th>
                        <th>Booking Date</th>
                        <th>Duration</th>
                      </tr>
                      {userData.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            {/* <td>{e.uid}</td> */}
                            <td>{e.name}</td>
                            <td>{e.service}</td>
                            <td>{e.bdate}</td>
                            <td>{e.duration}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handleUserPrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
        </Offcanvas.Body>
      </Offcanvas>     
      
<Offcanvas className="booking-report" placement="top" show={showRoom} onHide={handleCloseRoom} >
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Room Report
            </h3>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {roomdDate.length > 0 ? (
              <div>
                {" "}
                <div ref={RoomRef} className="text-center ">
                <div className="container ">
                  <div className="invoice">
                    <div className="row">
                      <div className="col-7 text-start">
                        <img
                          src="../Image/Logo/apnalogo.png"
                          className="invoice-logo"
                          alt=""
                        />
                      </div>
                      <div className="col-5">
                        <h1 className="document-type display-4">APNA PG</h1>
                        <p className="document-type text-right">
                          <strong>SINCE :2018</strong>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-8 text-start">
                        <p>
                          <>67, Anjan Apartment,</>
                          <br />
                          Swastik Socity,Navrangpura,
                          <br />
                          Ahmedabad-380009.
                          <br />
                          <b>Report Date : {today}</b>
                        </p>
                      </div>

                    </div>
                    <br />
  <p className="about-para mt-0 fs-3">Room Data</p>
                    <Table responsive className="mt-3">
                    <tbody>
                      <tr>
                      <th>Room Id</th>
                <th>Title</th>
                {/* <th>Description</th> */}
                <th>category</th>
                <th>capacity</th>
                <th>vacancy</th>
                <th>Rent</th>
                <th>Image</th>
                      </tr>
                      {roomdDate.map((e, i) => {
                        return (
                          <tr key={i}>
                          <td>{e.id}</td>
                          <td>{e.title}</td>
                          {/* <td>{e.description}</td> */}
                          <td>{e.category}</td>
                          <td>{e.capacity}</td>
                          <td>{e.vacancy}</td>
                          <td>₹{e.price}</td>
                          <td>
                            <img
                              style={{ width: 80, height: 65 }}
                              className="img-fluid"
                              src={`/photo/${e.image}`}
                              alt=""
                            />
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                    </Table>

                  </div>
                </div>
                </div>
                <button
                  style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                  className="border-0 py-2 px-2 rounded"
                  onClick={handleRoomPrint}
                >
                  Print Report
                </button>
              </div>
            ) : null}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default GenerateReport;
