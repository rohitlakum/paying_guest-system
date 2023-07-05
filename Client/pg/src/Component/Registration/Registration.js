import React, { useState ,useEffect} from "react";
import "./Registration.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Swal from 'sweetalert2'
import axios from 'axios'
const Registration = () => {
 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [nameState, setnameState] = useState(false);
  const [numState, setNumState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passState, setPassState] = useState(false);
  const [ConpassState, setConPassState] = useState(false);

  const[err,setErr] = useState("")
  const[errState,setErrState] = useState(false)
  const [nameErr, setNameErr] = useState("");
  const [numErr, setNumErr] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [conpassErr, setConPassErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.length) {
      setnameState(true);
      setNameErr("The Name Field is required !");
    }
    else
    {
      setnameState(false);
    }
    
    if (!num.length) {
      setNumState(true);
      setNumErr("The Mobile number Field is required !");
    }
    else {
      if(num.length===10)
    {
        setNumState(false)
    }  
    else
    {
      setNumState(true)
      setNumErr("Mobile number must be 10 digits")
    }
    }
   
    const email_pattern =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.length) {
      setEmailState(true);
      setemailErr("The Email Field is required !");
    }  
    else {
      
      if(email_pattern.test(email))
      {
        setEmailState(false)
      }
      else{
        setEmailState(true)
        setemailErr("The email you entered is invalid")
      }
    }
    if (!pass.length) {
      setPassState(true);
      setPassErr("The Password Field is required !");
    }  
    else {
      if(pass.length<6){
        setPassState(true)
        setPassErr("Your password must be at least 6 characters.")
      }
      else
      {
        setPassState(false);
      }
    }
    if (!conPass.length) {
      setConPassState(true);
      setConPassErr("The Confirm Password Field is required !");
    }  
    else {
      if(pass===conPass)
      {
       setConPassState(false)
      }
      else
      {
        setConPassState(true)
         setConPassErr("Password and confirm password must be same")
      }
    }
    if(name.length && num.length===10 && email.length && email_pattern.test(email) && pass.length && conPass.length &&pass===conPass)
    {
      // alert("Done")
      axios.post("http://localhost:5000/registration",{
        name:name,email:email,num:num,password:pass
      }).then((dt) =>{
       if(dt.data.Message)
       {
        setemailErr(dt.data.Message)
        setEmailState(true);
       }
       if(dt.data.created)
       {
        setErrState(true)
        setName("")
        setEmail("")
        setNum("")
        setPass("")
        setConPass("")
       }
      })
        
    }
  };


const handleName = (e) =>
   {
    setNameErr("")
    const result = e.target.value.replace(/[^a-z]/gi, '')
    setName(result)
   
   } 

   const handleNum = (e) => {
    setNumErr("")
    const check = /^[0-9\b]+$/;
    {
      if(check.test(e.target.value) && e.target.value.length<=10)
      {
        setNum(e.target.value)
      }
    }
  }

  const handleEmail = (e)=>{
    setemailErr("")
 
    const email_pattern =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setEmail(e.target.value);
    if(email_pattern.test(e.target.value))
    {
      setEmailState(false)
    }
    else{
      setEmailState(true)
      setemailErr("The email you entered is invalid")
    }
    
  }

  const handlePass = (e) => {
    setPass(e.target.value)
    setPassErr("")
    if(e.target.value.length<6){
      setPassState(true)
      setPassErr("Your password must be at least 6 characters.")
    }
    else
    {
      setPassState(false)
    }
  }

  const handleConPass = (e) => {
    setConPass(e.target.value)
    setConPassErr("")
    if(e.target.value.length<6){
      setConPassState(true)
      setConPassErr("Your confirm password must be at least 6 characters.")
    }
    else
    {
      setConPassState(false)
    }
  }

  const accountCreated = ()=>{
Swal.fire(
  'Congratulation!',
  'your account has been created successfully!'
)
  }

  useEffect (()=>{
    if(sessionStorage.getItem('user-info')){
      navigate("/")
    }
    else
    {
      navigate("/registration")
    }
  },[])
  
  return (
    <>
     {
    errState ? accountCreated():null
    }

      <Header />
      <h3
        className="mt-2 registration-heading text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        REGISTRATION
      </h3>
      <section className="registration-section">
        <div className="container">
          <div>
            <div className="registration-form-wrapper d-flex justify-content-center ">
              <form
                className="registration-form shadow needs-validation"
                data-aos="zoom-in"
                data-aos-duration="1400"
                noValidate
                onSubmit={handleSubmit}
              >
                <h2 className="re-title mb-4">Registration</h2>
                <div>
                  <input
                    type="text"
                    className="form-control rounded border-white mb-3 form-input"
                    name="name"
                    autoComplete="False"
                    placeholder="Full name"
                    value={name}
                    onChange={handleName}
                  />
                  {nameState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {nameErr}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <input
                    type="name"
                    className="form-control rounded border-white mb-3 form-input"
                    name="number"
                    placeholder="Mobile number"
                    autoComplete="False"
                    value={num}
                    onChange={handleNum}
                  />
                  {numState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {numErr}
                    </p>
                  ) : (
                    ""
                  )}
                  </div>
                  <div>
                  <input
                    type="email"
                    className="form-control rounded border-white mb-3 form-input"
                    name="email"
                    placeholder="Email address"
                    autoComplete="False"
                    value={email}
                    onChange={handleEmail}
                  />
                   {emailState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {emailErr}
                    </p>
                  ) : (
                    ""
                  )}
                  </div>

                  <div>

                  <input
                    type="password"
                    className="form-control rounded border-white mb-3 form-input"
                    name="password"
                    placeholder="Password"
                    autoComplete="False"
                    value={pass}
                    onChange={handlePass}
                  />
                   {passState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {passErr}
                    </p>
                  ) : (
                    ""
                  )}

                  </div>


                <div>
                  <input
                    type="password"
                    className="form-control rounded border-white mb-3 form-input"
                    name="cpassword"
                    placeholder="Confirm password"
                    autoComplete="False"
                    value={conPass}
                    onChange={handleConPass}
                  />
                   {ConpassState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {conpassErr}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

               
                <div className="registration-button">
                  <input type="submit" value="Registration" />
                </div>
                <div>
                  <p className="re-description mt-3">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Registration;
