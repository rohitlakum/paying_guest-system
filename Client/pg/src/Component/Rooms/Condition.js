import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import './Condition.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from "react-bootstrap";
import {BsArrowRight} from 'react-icons/bs'
const Condition = () => {
  const [roomid, setroomid] = useState("");
  const [rent, setrent] = useState("");

  const[isChecked,setIsChecked] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    setroomid(location.state.roomid)
    setrent(location.state.rent)
  }, []);
  const handleNext = ()=>{
    isChecked ? navigate("/selectbed",{state:{roomid:roomid,rent:rent}}):toast.error('please accept terms and conditions !', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
  }
  return <>
  <ToastContainer />
  <Header/>
  <h3
        className="mt-2 room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        TERMS & CONDITIONS
      </h3>
      <section className="condition-section mt-0">
        <Container>
        <div className='terms-para'  data-aos="fade-up" data-aos-duration="1100">
     <p><BsArrowRight className="me-2 fs-5"/>Outsiders not allowed in the pg if you're expecting a guest than you must have to give notice atleast before 5 days.</p>
     <p>
     <BsArrowRight className="me-2 fs-5"/>
     Alchohol or anyother intoxicating substances are strictly not allowed in pg if you're founded to having or storing it than streak measures will be taken against you.
     </p> 
     <p>
     <BsArrowRight className="me-2 fs-5"/>
     Pg gate will be closed at 11:00 p.m. onwards and will remain closed till early morning at 5:00 a.m.(expected situations will be understood).
     </p>
     <p>
     <BsArrowRight className="me-2 fs-5"/>
     If you're staying in A.c. room than electricity bill of particular a.c. will charged from you.
     </p>
     <p>
     <BsArrowRight className="me-2 fs-5"/>
     Deposite is non refundable it's mustly counted as rent.
     </p>
      <p>
     <BsArrowRight className="me-2 fs-5"/>
     You must have to inform us before 30 days minimum before leaving pg otherwise your deposit will not been counted.
     </p>
     <p>
     <BsArrowRight className="me-2 fs-5"/>
     If you want to cancel your booking than you'll be charged accordingly.
     </p> 
    <span className="terms"><BsArrowRight className="me-2 fs-5"/>When you're booking the bed you'll be charged 1 rent as a deposit which will be included at your last month of stay</span>
<div className="mt-3">
<input type="checkbox" className="check mx-2" onChange={(e)=>setIsChecked(!isChecked)} />
By using the platform you agree to be bound by the terms and conditions...
</div>
<div className="text-center mt-4" >
<button className="next-button" onClick={handleNext}>Next</button>
</div>
</div>

        </Container>
      </section>
  </>;
};

export default Condition;
