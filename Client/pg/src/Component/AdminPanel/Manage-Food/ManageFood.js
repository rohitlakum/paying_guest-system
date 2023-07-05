import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ImCross } from "react-icons/im";
import { MdOutlineFastfood } from "react-icons/md";
import "./ManageFood.css";
import { GoPencil } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const ManageFood = () => {
  const [Food, setFood] = useState([]);
  const [Breakfast, setBreakfast] = useState("");
  const [Lunch, setLunch] = useState("");
  const [Dinner, setDinner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [show, setShow] = useState(false);
  const[id,setId] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:5000/getfood").then((dt) => setFood(dt.data));
  });

  const handleAddFood = (e) => {
    e.preventDefault();
    if (Breakfast.length && Lunch.length && Dinner.length) {
      const dt = new Date(startDate);
      const tyear = dt.getFullYear();
      const tmonth = dt.getMonth() + 1;
      const tday = dt.getDate();
      const sdate = `${tday}-${tmonth}-${tyear}`;
      axios
        .post("http://localhost:5000/addfood", {
          dt: sdate,
          breakfast: Breakfast,
          lunch: Lunch,
          dinner: Dinner,
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
            setStartDate("");
            setBreakfast("");
            setDinner("");
            setLunch("");
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

  const removefood = (x) => {
    axios.delete(`http://localhost:5000/deletefood${x}`).then((dt) => {
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
  };

  const handleshow = (y) => {
    axios.post(`http://localhost:5000/getfoodforupdate${y}`).then((dt) => {
      setBreakfast(dt.data[0].morning);
      setLunch(dt.data[0].afternoon);
      setDinner(dt.data[0].evening);
      setId(dt.data[0].id)
    });
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setStartDate("");
    setBreakfast("");
    setLunch("");
    setDinner("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (startDate.length === 0) {
      toast.error("Plase select date!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (Breakfast.length && Lunch.length && Dinner.length) {
        const utt = new Date(startDate);
        const uyear = utt.getFullYear();
        const umonth = utt.getMonth() + 1;
        const uday = utt.getDate();
        const udate = `${uday}-${umonth}-${uyear}`;
        axios
        .post("http://localhost:5000/updatefood", {
          fid:id,
          dt: udate,
          breakfast: Breakfast,
          lunch: Lunch,
          dinner: Dinner,
        })
        .then((dt)=>{
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
        })
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
  };
  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        MANAGE FOODMENU
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
            Add FoodMenu
            <MdOutlineFastfood className="ms-1" />
          </h6>
          {
            Food.length>0? <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Food.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.date}</td>
                    <td>{e.morning}</td>
                    <td>{e.afternoon}</td>
                    <td>{e.evening}</td>
                    <td>
                      <GoPencil
                        style={{ cursor: "pointer" }}
                        className="fs-4 text-primary"
                        onClick={() => handleshow(e.id)}
                      />
                    </td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removefood(e.id)}
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
        className="addfoodmenu-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Food Details
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
            <form className="roomform" onSubmit={handleAddFood}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => setStartDate(date)}
                  selected={startDate}
                  placeholderText="Select date"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />

                <input
                  type="text"
                  name="breakfast"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Breakfast Datails"
                  value={Breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                />

                <input
                  type="text"
                  name="lunch"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Lunch Details"
                  value={Lunch}
                  onChange={(e) => setLunch(e.target.value)}
                />

                <input
                  type="text"
                  name="dinner"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Dinner Details"
                  value={Dinner}
                  onChange={(e) => setDinner(e.target.value)}
                />
              </div>
              <button className="addroom-btn">Add</button>
            </form>
          </Container>
        </div>
      </div>

      <Offcanvas
        className="addfoodmenu-ofset"
        placement="top"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="mx-auto">
            {" "}
            <h3 style={{ color: "#484848" }} className="manage-room">
              Update Details
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <form className="roomform" onSubmit={handleUpdate}>
              <div className="form-label-group">
                <DatePicker
                  className="form-control room-control ps-3 mb-3"
                  onChange={(date) => setStartDate(date)}
                  selected={startDate}
                  placeholderText="Select date"
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                />

                <input
                  type="text"
                  name="breakfast"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Breakfast Datails"
                  value={Breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                />

                <input
                  type="text"
                  name="lunch"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Lunch Details"
                  value={Lunch}
                  onChange={(e) => setLunch(e.target.value)}
                />
                <input
                  type="text"
                  name="dinner"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Enter Dinner Details"
                  value={Dinner}
                  onChange={(e) => setDinner(e.target.value)}
                />
              </div>
              <button className="addroom-btn">Update</button>
            </form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ManageFood;
