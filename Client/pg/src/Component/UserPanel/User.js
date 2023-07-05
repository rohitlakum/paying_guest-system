import Offcanvas from "react-bootstrap/Offcanvas";
import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { GrCompliance } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TfiControlBackward } from "react-icons/tfi";
import { BsJournalCheck } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineFastfood } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { RxExit } from "react-icons/rx";
import "./User.css";
import axios from "axios";
const User = () => {
  const [data, setData] = useState([]);
  const[approve,setApprove] = useState();

  const naviagte = useNavigate();
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  useEffect(() => {
    naviagte("profile");
    const uid = sessionStorage.getItem("user-id");
    axios.post(`http://localhost:5000/userdata${uid}`).then((dt) => {
      setName(dt.data[0].name);
      setImage(dt.data[0].image);
    });
    const id = sessionStorage.getItem("user-id");
    axios
      .post(`http://localhost:5000/servicebuyer${id}`)
      .then((dt) => setData(dt.data));
      axios
      .post(`http://localhost:5000/cancellationdata${uid}`)
      .then((dt)=>{
        setApprove(dt.data[0].approve)
      })
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogOut = () => {
    sessionStorage.removeItem("user-info");
    sessionStorage.removeItem("isbooked");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("user-id");
    naviagte("/");
  };

  return (
    <>
      <div className="user-logo-con container">
        <div>
          {" "}
          <Nav.Link as={NavLink} to="/">
            <div className="logo fs-3 ms-4 mb-2">
              <span className="brd">
                <span className="apna">APNA</span> PG
              </span>
            </div>
          </Nav.Link>
        </div>
        <div className="user-slide-toggle" onClick={() => handleShow()}>
          {show ? <GrClose /> : <RxHamburgerMenu />}
        </div>
      </div>

      <Offcanvas className="user-canva" show={show} onHide={handleClose}>
        <Offcanvas.Body
          onClick={() => handleClose()}
          className="user-slide-link-item"
          data-aos="fade-right"
          data-aos-duration="200"
        >
          <div className="user-acc mb-2">
            <img
              className="img-fluid user-slide-img"
              src={`/img/${Image}`}
              alt=""
            />
            <h4 className="ms-2">{Name}</h4>
          </div>
          <Nav.Link
            as={NavLink}
            to="profile"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <CgProfile />
            </span>
            Manage Profile
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="viewroomdetails"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <BiCategoryAlt />
            </span>
            View Room Detail
          </Nav.Link>
          {data.length > 0 ? (
            <Nav.Link
              as={NavLink}
              to="viewservice"
              className="sidebar-link sidebar-link-hov"
            >
              <span className="me-2 ">
                <BsCartCheck />
              </span>
              View Service Detail
            </Nav.Link>
          ) : null}


          <Nav.Link
            as={NavLink}
            to="canclebooking"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <ImCancelCircle />
            </span>
            Booking Cancelation
          </Nav.Link>

         {
          approve===1? <Nav.Link
          as={NavLink}
          to="getrefund"
          className="sidebar-link sidebar-link-hov"
        >
          <span className="me-2 ">
            <GiTakeMyMoney />
          </span>
          Get Refund
        </Nav.Link>:null
         }


<Nav.Link
            as={NavLink}
            to="viewfoodmenu"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <MdOutlineFastfood />
            </span>
            View Food Menu
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="writereviews"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <BsChatSquareText />
            </span>
            Write Reviews
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="makecomplaint"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <GrCompliance />
            </span>
            Make complaints
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="writenotice"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <MdOutlineNotificationsActive />
            </span>
            Write & View Notice
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="getservice"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <BsJournalCheck />
            </span>
            Get Extra Services
          </Nav.Link>

        

          <Nav.Link
            as={NavLink}
            to="/"
            className="sidebar-link sidebar-link-hov"
          >
            <span className="me-2 ">
              <TfiControlBackward />
            </span>
            Back To Home
          </Nav.Link>
          <Nav.Link
            className="sidebar-link sidebar-link-hov"
            onClick={handleLogOut}
          >
            <span className="me-2 ">
              <RxExit />
            </span>
            Log Out
          </Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default User;
