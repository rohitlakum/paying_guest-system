import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./SelectBed.css";
import axios from "axios";
import FormData from "form-data";
import Swal from 'sweetalert2'
const SelectBed = () => {
  const location = useLocation();
  const [roomId, setRoomId] = useState(location.state.roomid);
  const [rent, setRent] = useState(location.state.rent);
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [num, setNum] = useState("");
  const [anum, setAnum] = useState("");
  const [anumState, setANumState] = useState(false);
  const [anumErr, setANumErr] = useState("");
  const [msg, setMsg] = useState("");
  const [msgState, setMsgState] = useState(false);
  const [msgErr, setMsgErr] = useState("");
  const [Files, setFiles] = useState("");
  const [filename, setfilename] = useState("");
  const [filesErr, setFilesErr] = useState("");
  const [fileState, setFileState] = useState(false);
  const [testFile, setTestFile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem("user-id"));
    axios.get(`http://localhost:5000/getuser${userId}`).then((dt) => {
      setName(dt.data[0].name);
      setemail(dt.data[0].email);
      setNum(dt.data[0].pno);
    });
  }, []);

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
    if (setFiles.length) {
      setTestFile(true);
      setfilename(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!anum.length) {
      setANumState(true);
      setANumErr("Aadharcard number Field is required !");
    } else {
      if (anum.length === 12) {
        setANumState(false);
      } else {
        setANumState(true);
        setANumErr("Aadharcard number must be 12 digits");
      }
    }
    if (!msg.length) {
      setMsgState(true);
      setMsgErr("The Message Field is required !");
    } else {
      setMsgState(false);
    }
    if (!filename.length) {
      setFileState(true);
      setFilesErr("The Image Field is required !");
    } else {
      setFilesErr(false);
    }

    if (anum.length === 12 && msg.length && filename.length) {
      setANumErr(false);
      setMsgErr(false);
      setFilesErr(false);
      const userid = JSON.parse(sessionStorage.getItem("user-id"));
      const formdata = new FormData();
      formdata.append("uid", userid);
      formdata.append("room", roomId);
      formdata.append("name", Name);
      formdata.append("email", email);
      formdata.append("mobile", num);
      formdata.append("aadharcard", anum);
      formdata.append("address", msg);
      formdata.append("fileupload", Files);
      axios.post("http://localhost:5000/getpayment",{
              id:roomId
            })
            .then((dt)=>{
              var options = {
                'key': "rzp_test_Cl1G7wgRpRqdBD", 
                'amount': dt.data.amount, 
                'currency': "INR",
                'name': "Apna PG",
                'description': "Test Transaction",
                'image': "/Image/Logo/apnalogo.png",
                'order_id': dt.data.id,
                handler:async(response) =>{
                  try{
                    axios.post("http://localhost:5000/varifypayment",response)
                    .then((dt)=>{
                      if(dt.status===200)
                      {
                        axios.post("http://localhost:5000/booking", formdata)
                        .then((dt)=>{
                          if(dt.status ===200)
                          {
                            axios.get(`http://localhost:5000/setisbooked${email}`)
                            .then((dt)=>{
                              if (dt.data.isBookedtrue) {
                             
                                sessionStorage.setItem("isbooked", JSON.stringify(1));
                                navigate("/dashboard");
                              }
                            })
                            axios.post("http://localhost:5000/vacancy",{
                              id:roomId
                            })
                            .then((dt)=>{
                              if(dt.status === 200){
                                const uid = JSON.parse(sessionStorage.getItem("user-id"));
                                axios.post("http://localhost:5000/payment",{
                                  id:uid,name:Name,rid:roomId
                                })
                                .then((dt)=>{
                                  if(dt.status === 200)
                                  {
                                    Swal.fire(
                                      'Congratulation!',
                                      'You successfully created your booking !'
                                    )
                                  }
                                })
                              }
                            })
                            
                          }
                        })
                      }
                    })
                  }
                  catch(error){
                    console.log(error)
                  }
                },
                'theme':{
                  color:"#6f7efd"
                },
            }
              const rzp1=new window.Razorpay(options)
            rzp1.open();
            })

     
    }
    
  };

  const handleNum = (e) => {
    setANumErr("");
    const check = /^[0-9\b]+$/;
    {
      if (check.test(e.target.value) && e.target.value.length <= 12) {
        setAnum(e.target.value);
      }
    }
  };

  const handleMsg = (e) => {
    setMsgErr("");
    setMsg(e.target.value);
  };
  return (
    <>
      <Header />
      {/* <p className='text-center fs-1'>{location.state.roomid}</p> */}
      <h3
        className="mt-2 book text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        BOOKING DETAILS
      </h3>
      <section className="book-section">
        <div
          className="shadow mt-5"
          data-aos="zoom-in"
          data-aos-duration="1400"
        >
          <form className="bookform" onSubmit={handleSubmit}>
            <div className="form-label-group">
              <input
                disabled={true}
                type="text"
                name="name"
                className="form-control book-control ps-3 mb-3"
                placeholder="Full Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                disabled={true}
                type="text"
                name="mobile"
                className="form-control book-control ps-3 mb-3"
                placeholder="Mobile No"
                value={num}
                onChange={(e) => setemail(e.target.value)}
              />
              <input
                disabled={true}
                type="email"
                name="email"
                className="form-control book-control ps-3 mb-3"
                placeholder="Email id"
                value={email}
                onChange={(e) => setNum(e.target.value)}
              />
              <input
                type="text"
                name="aadharcard"
                className="form-control book-control ps-3 mb-3"
                placeholder="Aadharcard Number"
                value={anum}
                onChange={handleNum}
              />
              {anumState ? (
                <p
                  className="error"
                  data-aos="fade-left"
                  data-aos-duration="1100"
                >
                  {anumErr}
                </p>
              ) : (
                ""
              )}
              <textarea
                placeholder="Address"
                className="form-control book-control ps-3 mb-3"
                name="address"
                value={msg}
                onChange={handleMsg}
              />
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

              {/* <DatePicker selected={startDate} onChange={handleDate} className="form-control book-control ps-3 mb-3" dateFormat="dd/MM/yyyy" placeholderText="Select booking date" minDate={new Date()}/> */}

              <div className="variants">
                <div className="file ps-3 mb-3">
                  <label htmlFor="input-file">
                    {testFile ? filename : "Select Profile"}
                  </label>
                  <input
                    id="input-file"
                    type="file"
                    name="fileupload"
                    accept="image/*"
                    onChange={(e) => handleFile(e)}
                  />
                </div>
                {fileState ? (
                  <p
                    className="error"
                    data-aos="fade-left"
                    data-aos-duration="1100"
                  >
                    {filesErr}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="text-center">
                <button className="book-button">Book Now</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SelectBed;
// import React, { useState } from 'react'
// import FormData from 'form-data'
// import axios from 'axios'
// const SelectBed = () => {
//   const[name,setName] = useState("")
//   const[image,setIamge] = useState("")
//   const handlesubmit = (e)=>{
//     e.preventDefault()
//      let formdata = new FormData();
//      formdata.append("name",name)
//      formdata.append("fileupload",image)
//      axios.post("http://localhost:5000/booking",formdata)
//      .then((dt)=>console.log(dt.data))

//   }
//   return (
//     <div>
//       <form onSubmit={handlesubmit}>
//         <input type="text" name="name" onChange={(e)=>setName(e.target.value)}  />
//         <input type="file" name="fileupload" onChange={(e)=>setIamge(e.target.files[0])}  />
//         <input type="submit" value="submit" />
//       </form>
//     </div>
//   )
// }

// export default SelectBed
