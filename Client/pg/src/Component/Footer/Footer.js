import React from "react";
import './Footer.css';
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
    <footer>
      <Container>
        <div className="main-con">

       <Row className="my-5">
        <Col lg={4} md={4} sm={12}>
         <div className="">
         <h5 className="h5">APNA PG</h5>
        <p className="para">Apna Pg Accommodation professionally managed PG home in the Navrangpura, Ahmedabad. Located in a safe neighborhood, our male PG offers various modern amenities for your comfort.</p>
         </div>
        </Col>


        <Col lg={4} md={4} sm={12}>
       <div className="link-div">
        <h5 className="h5">Useful Links</h5>
        <div className="p item mt-2">
        <Link className="p li"  to="/">Home</Link>
         <Link className="p li" to="/about">About</Link>
         <Link className="p li" to="/service">Service</Link>
         <Link className="p li" to="/room">Room</Link>
         <Link className="p li " to="/contact">Contact</Link>
         </div>
       </div>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <h5 className="h5">Get In Touch</h5>
          <div className="mt-2 para">
         <p><AiOutlineHome className="me-2 fs-6"/>Anjan Apartment, 67, Swastik Society Cross Rd, Swastik Society, Navrangpura, Ahmedabad, Gujarat 380009</p>
          <p><AiOutlineMail className="me-2 fs-6"/>apnapg67@gmail.com</p>
          <p><FiPhoneCall className="me-2 fs-6"/>+91 8671949418</p>
         </div>
        </Col>
       </Row>
        </div>
      </Container>
    </footer>
    {/* <img className="img-fluid" src="./Image/apna-png.png" /> */}
    </>
  );
};

export default Footer;

