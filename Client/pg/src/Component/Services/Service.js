import React, { useEffect, useState } from "react";
import "./Service.css";
import { Container } from "react-bootstrap";
import Footer from '../Footer/Footer'
import Header from "../Header/Header";
import axios from "axios";
// import { BsWifi } from "react-icons/bs";
// import { GiWashingMachine } from "react-icons/gi";
// import { GiWaterGallon } from "react-icons/gi";
// import { RiFridgeLine } from "react-icons/ri";
// import { FaHandHoldingWater } from "react-icons/fa";
// import { GiVacuumCleaner } from "react-icons/gi";

const Service = () => {
  const [serviceData,setServiceData] = useState([]);
  useEffect(()=>{
    axios.post("http://localhost:5000/getservice")
    .then((dt)=>{
      setServiceData(dt.data);
    })
  })

  return (
    <>
<Header/>
       <h3 className="mt-2 service text-center" data-aos="fade-down" data-aos-duration="700">SERVICES</h3>
      <section className="service-section">
        <Container>
          <div className="row mt-4">
{
  serviceData.map((e,i)=>{
    return(
      <div key={i} className="col-lg-6 col-12 text-center s-main-col" data-aos="zoom-in" data-aos-duration="1300">
      <div className="card mt-4 c ">
        <div className="cart-body">
          <div className="cart-logo fs-3">
          {i+1}</div>
          <h3 className="s-h3">{e.title}</h3>
          <p className="s-para card-text">{e.description}</p>
          </div>
        </div>
      </div>
    )
  })
}
<div className="mb-5"></div>

              {/* <div className="col-lg-6 col-12 text-center s-main-col" data-aos="zoom-in" data-aos-duration="1300">
            <div className="card mt-4 c ">
              <div className="cart-body">
                <div className="cart-logo fs-3">
                1</div>
                <h3 className="s-h3">Wifi</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div> */}

            {/* <div className="col-lg-6 col-12 text-center s-main-col" data-aos="fade-left" data-aos-duration="1300">
            <div className="card mt-4 c "  >
              <div className="cart-body">
                <div className="cart-logo fs-3">
                2</div>
                <h3 className="s-h3">Laundry</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12 text-center s-main-col" data-aos="fade-right" data-aos-duration="1300">
            <div className="card mt-4 c "  >
              <div className="cart-body">
                <div className="cart-logo fs-3">
                3</div>
                <h3 className="s-h3">Water Purifier</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12 text-center s-main-col" data-aos="fade-left" data-aos-duration="1300">
            <div className="card mt-4 c "  >
              <div className="cart-body">
                <div className="cart-logo fs-3">
                4</div>
                <h3 className="s-h3">Fridge</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12 text-center s-main-col" data-aos="fade-right" data-aos-duration="1300">
            <div className="card mt-4 c "  >
              <div className="cart-body">
                <div className="cart-logo fs-3">
                5</div>
                <h3 className="s-h3">Regular Water Supply</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>

  <div className="col-lg-6 col-12 text-center s-main-col" data-aos="fade-left" data-aos-duration="1300">
            <div className="card mt-4 c "  >
              <div className="cart-body">
                <div className="cart-logo fs-3">
                6</div>
                <h3 className="s-h3">Daily Cleaning</h3>
                <p class="s-para card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
 */}

          
          </div>
        </Container>
      </section> 
      <Footer/>
    </>
  );
};

export default Service;
