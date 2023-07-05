import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";
const Profile = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pno, setPno] = useState("");
  const [Address, setAddress] = useState("");
  const [Image, setImage] = useState("");

  const [pass, setPass] = useState("");
  const [Currentpass, setCurrentPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [passState, setPassState] = useState(false);
  const [CurrentpassState, setCurrentPassState] = useState(false);
  const [ConpassState, setConPassState] = useState(false);

  const [passErr, setPassErr] = useState("");
  const [currentpassErr, setPassCurrentErr] = useState("");
  const [conpassErr, setConPassErr] = useState("");

  useEffect(() => {
    const uid = sessionStorage.getItem("user-id");
    axios.post(`http://localhost:5000/userdata${uid}`).then((dt) => {
      setName(dt.data[0].name);
      setEmail(dt.data[0].email);
      setPno(dt.data[0].pno);
      setAddress(dt.data[0].address);
      setImage(dt.data[0].image);
    });
    // const d = sessionStorage.getItem("userid");
    // axios.post(`http://localhost:5000/userdata${d}`).then((dt) => {
    //   setName(dt.data[0].name);
    //   setEmail(dt.data[0].email);
    //   setPno(dt.data[0].pno);
    //   setAddress(dt.data[0].address);
    //   setImage(dt.data[0].image);
    // });
  }, []);
  const handleNum = (e) => {
    const check = /^[0-9\b]+$/;
    {
      if (check.test(e.target.value) && e.target.value.length <= 10) {
        setPno(e.target.value);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Name.length === 0) {
      toast.error("Name field must be require!", {
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
    if (Email.length === 0) {
      toast.error("Email field must be require!", {
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
    if (Address.length === 0) {
      toast.error("Address field must be require!", {
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
    if (Pno.length !== 10) {
      toast.error("Mobile number must be 10 digit", {
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
    if (
      Name.length !== 0 &&
      Email.length !== 0 &&
      Address.length !== 0 &&
      Pno.length === 10
    ) {
      const uid = sessionStorage.getItem("user-id");
      axios
        .post("http://localhost:5000/userprofile", {
          id: uid,
          name: Name,
          pno: Pno,
          email: Email,
          address: Address,
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
          }
        });
    }
  };
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
  const handleCurrentPass = (e)=>{
    setCurrentPass(e.target.value)
    setPassCurrentErr("")
   
  }
  const handlePassword = (e)=>{
    e.preventDefault();
    if (!Currentpass.length) {
      setCurrentPassState(true);
      setPassCurrentErr("The Current password Field is required !");
    }  
    else {
      setCurrentPassState(false);
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
    if( pass.length && conPass.length &&pass===conPass){
      const uid = sessionStorage.getItem("user-id");
      axios.post(`http://localhost:5000/updatepass${uid}`,{
        Currentpass:Currentpass,newpass:pass,confirmpass:conPass
      })
      .then((dt)=>{
        if(dt.status===200){
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
          setConPass("")
          setPass("")
          setCurrentPass("")
        }
       else{
        if(dt.status===202){
          setPassCurrentErr(dt.data.Error)
          setCurrentPassState(true)
        }
       }
      })
  
    }
    else{

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
        MANAGE PROFILE
      </h3>
      <section className="user-profile-section">
        <Container>
          <form
            className="roomform"
            data-aos="zoom-in"
            data-aos-duration="1400"
            onSubmit={handleSubmit}
          >
            <div className="form-label-group">
              {/* <div className="user-profile text-center">
                <img className="img-fluid" src={`/img/${Image}`} alt="" />
              </div> */}
              <input
                type="text"
                name="name"
                className="form-control room-control ps-3 mb-3"
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                name="pno"
                className="form-control room-control ps-3 mb-3"
                placeholder="Phone Number"
                value={Pno}
                onChange={(e) => {
                  handleNum(e);
                }}
              />
              <input
                type="email"
                name="email"
                className="form-control room-control ps-3 mb-3"
                placeholder="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                name="address"
                className="form-control room-control ps-3 mb-3"
                placeholder="Address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Link
              className="link-style ms-1"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop"
              aria-controls="offcanvasTop"
            >
              Change password?
            </Link>
            <div className="text-center">
              <button className="addroom-btn">UPDATE</button>
            </div>
          </form>
        </Container>
      </section>
      <div
        className="password-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Change Password
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
            <form className="roomform" onSubmit={handlePassword}>
              <div className="form-label-group">
                <input
                  type="password"
                  name="roomid"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Current password"
                  value={Currentpass}
                  onChange={handleCurrentPass}
                />
              </div>
              {CurrentpassState ? (
                    <p
                      className="error"
                      data-aos="fade-left"
                      data-aos-duration="1100"
                    >
                      {currentpassErr}
                    </p>
                  ) : (
                    ""
                  )}
              <div className="form-label-group">
                <input
                  type="password"
                  name="roomid"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="New password"
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
              <div className="form-label-group">
                <input
                  type="password"
                  name="roomid"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Confirm password"
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
              <button className="addroom-btn">Update</button>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Profile;
