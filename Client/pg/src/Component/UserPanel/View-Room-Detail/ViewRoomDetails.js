import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./ViewRoomDetails.css";
import Swal from "sweetalert2";
const ViewRoomDetails = () => {
  const [data, setData] = useState([]);
  const divref = useRef();
  const [room, setroom] = useState("");
  const [category, setcategory] = useState("");
  const [bdate, setbdate] = useState("");
  const [duration, setduration] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pno, setpno] = useState("");
  const [address, setaddress] = useState("");
  const [rent, setrent] = useState("");
  const [Deposit, setdeposit] = useState("");
  const [show, setShow] = useState(false);
  const [cDate, setCDate] = useState("");
  const [same, setSame] = useState(false);
  useEffect(() => {
    const id = sessionStorage.getItem("user-id");
    axios.post(`http://localhost:5000/getroomdata${id}`).then((dt) => {
      setcategory(dt.data[0].category);
      setData(dt.data);
      setname(dt.data[0].name);
      setemail(dt.data[0].email);
      setpno(dt.data[0].pno);
      setaddress(dt.data[0].address);
      setroom(dt.data[0].roomno);
      setbdate(dt.data[0].bdt);
      setduration(dt.data[0].dura);
      setCDate(dt.data[0].duration);
      const roomnum = dt.data[0].roomno;

      axios
        .post(`http://localhost:5000/getroomcategory${roomnum}`)
        .then((dt) => {
          setcategory(dt.data[0].category);
          axios.post(`http://localhost:5000/getpaymentdt${id}`).then((dt) => {
            setdeposit(dt.data[0].payment);
            setrent(dt.data[0].payment);
          });
        });
    });
  }, []);

  const todayObject = new Date();
  let tday = todayObject.getDate();
  let tmonth = todayObject.getMonth() + 1;
  let tyear = todayObject.getFullYear();
  const today = `${tmonth}-${tday}-${tyear}`;

  const DurationObject = new Date(cDate);
  let dday = DurationObject.getDate();
  let dmonth = DurationObject.getMonth() + 1;
  let dyear = DurationObject.getFullYear();
  const DurationDay = `${dmonth}-${dday}-${dyear}`;

  // const isSame = (today === DurationDay) || (DurationDay < today);
  const isSame = DurationDay < today;

  const handlePrint = useReactToPrint({
    content: () => divref.current,
    documentTitle: "Booking-invoice",
    onAfterPrint: () => {
      toast.success("Invoice downloaded successfully", {
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

  const handleBook = () => {
    axios
      .post("http://localhost:5000/rebookingpayment", {
        id: room,
      })
      .then((dt) => {
        var options = {
          key: "rzp_test_Cl1G7wgRpRqdBD",
          amount: dt.data.amount,
          currency: "INR",
          name: "Apna PG",
          description: "Test Transaction",
          image: "/Image/Logo/apnalogo.png",
          order_id: dt.data.id,
          handler: async (response) => {
            try {
              axios
                .post("http://localhost:5000/testpayment", response)
                .then((dt) => {
                  if (dt.status === 200) {
                    const uid = sessionStorage.getItem("user-id");
                    axios
                      .post(`http://localhost:5000/setbookingdate${uid}`, {
                        rid: room,
                      })
                      .then((dt) => {
                        if (dt.status === 200) {
                          Swal.fire(
                            "Congratulation!",
                            "You successfully created your booking !"
                          );
                        }
                      });
                  }
                });
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#6f7efd",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      });
  };
  return (
    <>
      <ToastContainer />

      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        VIEW ROOM DETAIL
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                {/* <th>Index</th> */}
                {/* <th>Id</th> */}
                <th>Room No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile no</th>
                <th>Aadharcard id</th>
                <th>Booking date</th>
                <th>Booking duration</th>
                <th>Address</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr key={i}>
                    {/* <td>{i + 1}</td> */}
                    {/* <td>{e.userid}</td> */}
                    <td>{e.roomno}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.pno}</td>
                    <td>{e.aadhar}</td>
                    <td>{e.bdt}</td>
                    <td>{e.dura}</td>
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
          <button
            style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
            className="border-0 py-1 px-2 rounded"
            onClick={() => setShow(true)}
          >
            Get Invoice
          </button>
          {isSame ? (
            <button
              style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
              className="border-0 py-1 px-2 ms-2 rounded"
              onClick={handleBook}
            >
              Continue Booking
            </button>
          ) : null}
          {show ? (
            <div>
              {/*✅ Invoice data start ✅*/}
              <button
                style={{ backgroundColor: "#6f7efd", color: "#ffffff" }}
                className="border-0 ms-0 py-1 px-1 mt-2 rounded"
                onClick={handlePrint}
              >
                Print Invoice
              </button>
              <div ref={divref} className="text-center ">
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
                        </p>
                      </div>

                      <div className="col-4">
                        <br />
                        <br />
                        <br />
                        <p className="text-start">
                          <strong>{name}</strong>
                          <br />
                          {address},<br />
                          Mobile No: <em>{pno}</em>,<br />
                          Email: <em>{email}</em>.<br />
                        </p>
                      </div>
                    </div>
                    <br />

                    <Table responsive className="mt-3">
                      <thead>
                        <tr>
                          <th>Room No</th>
                          <th>Category</th>
                          <th>Booking Date</th>
                          <th>Duration</th>
                          <th>Rent</th>
                          <th>Deposit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{room}</td>
                          <td>{category}</td>
                          <td>{bdate}</td>
                          <td>{duration}</td>
                          <td>₹{Deposit / 2}</td>
                          <td>₹{Deposit / 2}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <p className="about-para text-start fs-6 mt-3">
                      We appreciate you as our valued guest!
                    </p>
                    <p className="conditions text-start">
                      TERMS & CONDITIONS :
                    </p>
                    <p className="conditions text-start">
                      1.If you're staying in A.c. room than electricity bill of
                      particular a.c. will charged from you.
                      <br />
                      2.Deposite is non refundable it's mustly counted as rent.
                      <br />
                      3.You must have to inform us before 30 days minimum before
                      leaving pg otherwise your deposit will not been counted.
                      <br></br>
                      4.If you want to cancel your booking than you'll be
                      charged accordingly.
                    </p>

                    <br />
                    <br />
                    <br />
                    <br />

                    <p className="bottom-page text-end">
                      67, Anjan Apartment,
                      <br />
                      Swastik Socity,Navrangpura,
                      <br />
                      Ahmedabad-380009.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              {/*❗ Invoice data End ❗ */}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default ViewRoomDetails;
