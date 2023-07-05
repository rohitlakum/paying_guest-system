import React, {useState } from "react";
import "./Contact.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Contact = () => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const [nameState, setnameState] = useState(false);
  const [numState, setNumState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [msgState, setMsgState] = useState(false);

  
  const [nameErr, setNameErr] = useState("");
  const [numErr, setNumErr] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [msgErr, setMsgErr] = useState("");

  
//   const handleSubmit =(e) =>{

//     if (!name.length) {
//       setnameState(true);
//       setNameErr("The Name Field is required !");
//     }
//     else
//     { 
//       console.log('Done')
//       setnameState(false);
//     }
  
//   if (!num.length) {
//     setNumState(true);
//     setNumErr("The Mobile number Field is required !");
//   }
//   else {
//     if(num.length===10)
//   {
     
//       setNumState(false)
//   }  
//   else
//   {
//     setNumState(true)
//     setNumErr("Mobile number must be 10 digits")
//   }
//   }
//   const email_pattern =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   if (!email.length) {
//     setEmailState(true);
//     setemailErr("The Email Field is required !");
//   }  
//   else {
    
//     if(email_pattern.test(email))
//     {
//       setEmailState(false)
//     }
//     else{
//       setEmailState(true)
//       setemailErr("The email you entered is invalid")
//     }
//   }

//   if (!msg.length) {
//     setMsgState(true);
//     setMsgErr("The Message Field is required !");
//   }
//   else
//   {
//     setMsgState(false)
//   }
//   if(name.length && num.length===10 && email.length && msg.length)
//   {
//       setName("")
//       setNum("")
//       setEmail("")
//       setMsg("")
//   }
// }


  // const handleName = (e) =>
  // {
  //  setNameErr("")
  //  const result = e.target.value.replace(/[^a-z]/gi, '')
  //  setName(result)
  // } 


  // const handleEmail = (e)=>{

  //   setemailErr("")
  //   const email_pattern =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   setEmail(e.target.value);
  //   if(email_pattern.test(e.target.value))
  //   {
  //     setEmailState(false)
  //   }
  //   else{
  //     setEmailState(true)
  //     setemailErr("The email you entered is invalid")
  //   }
  // }

  // const handleMobileNo = (e)=>{
  //   setNumErr("")
  //   const check = /^[0-9\b]+$/;
  //   {
  //     if(check.test(e.target.value) && e.target.value.length<=10)
  //     {
  //       setNum(e.target.value)
  //     }
  //   }
  // }

  // const handleMsg = (e)=>{
  //   setMsgErr("")
  //   setMsg(e.target.value)
  // }

  return (
    <>
      <Header />
      <h3
        className="mt-2 contact-us text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        CONTACT US
      </h3>
      <section className="contact-section">
        <div>
          <div className="container">
            <div>
              <div className="contact-form-wrapper d-flex justify-content-center ">
                <form
                  action="https://formspree.io/f/mlekrrwl"
                  method="post"
                  className="contact-form shadow"
                  data-aos="zoom-in"
                  data-aos-duration="1400"
                  // onSubmit={handleSubmit}
                >
                  <p className="description">
                    Feel free to contact us if you need any assistance, any help
                    or another question.
                  </p>
                  <div>
                    <input
                      type="text"
                      className="form-control rounded border-white mb-3 form-input"
                      name="Name"
                      autoComplete="False"
                      placeholder="Name"
                      required
                    //   value={name}
                    // onChange={handleName}
                    />
                    {nameState ? (
                    <p
                      className="contact-error"
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
                      type="email"
                      className="form-control rounded border-white mb-3 form-input"
                      name="Email Id"
                      placeholder="Email"
                      autoComplete="False"
                      // value={email}
                      // onChange={handleEmail}
                      required
                    />
                    {emailState ? (
                    <p
                      className="contact-error"
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
                      type="text"
                      className="form-control rounded border-white mb-3 form-input"
                      name="mobileno"
                      autoComplete="False"
                      placeholder="Mobile No"
                      // value={num}
                      // onChange={handleMobileNo}
                      required
                    />
                     {numState ? (
                    <p
                      className="contact-error"
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
                    <textarea
                      id="message"
                      className="form-control rounded border-white mb-3 form-text-area"
                      rows="5"
                      cols="30"
                      name="Message"
                      placeholder="Enter Your Message"
                      autoComplete="False"
                      // value={msg}
                      // onChange={handleMsg}
                      required
                    ></textarea>
                    {msgState ? (
                    <p
                      className="contact-error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {msgErr}
                    </p>
                  ) : (
                    ""
                  )}
                  </div>
                  <div className="submit-button-wrapper">
                    <input type="submit" value="Send" />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <iframe data-aos="zoom-in" data-aos-duration="1800"
            
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29372.739913285335!2d72.52538547910157!3d23.038730200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85e620a9af7f%3A0xe1fbbe8d15a92be9!2sAPNA%20P.G.!5e0!3m2!1sen!2sin!4v1671083471660!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
            {/* <iframe
              data-aos="zoom-in"
              data-aos-duration="1800"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5924895709422!2d72.55821571495444!3d23.03873018494485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85e620a9af7f%3A0xe1fbbe8d15a92be9!2sAPNA%20P.G.!5e0!3m2!1sen!2sin!4v1672031499545!5m2!1sen!2sin"
              width="100%"
            height="200"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
