import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";
import { Link } from "react-router-dom";
const AdminProfile = () => {
  const [Name, setName] = useState("");
  const [Pno, setPno] = useState("");
  const [Email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [numState, setNumState] = useState(false);
  const [numErr, setNumErr] = useState("");

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
    axios.post("http://localhost:5000/admindata").then((dt) => {
      setName(dt.data[0].name);
      setPno(dt.data[0].pno);
      setEmail(dt.data[0].email);
    });
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();

    if (Name.length && Pno.length === 10 && Email.length) {
      axios
        .post("http://localhost:5000/aprofile", {
          name: Name,
          pno: Pno,
          email: Email,
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
    } else {
      toast.error("All fields are mandatory!", {
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

  const handleNum = (e) => {
    setNumErr("");
    const check = /^[0-9\b]+$/;
    {
      if (check.test(e.target.value) && e.target.value.length <= 10) {
        setPno(e.target.value);
      }
    }
  };
  const handleShow = () => {
    setShow(true);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
    setPassErr("");
    if (e.target.value.length < 6) {
      setPassState(true);
      setPassErr("Your password must be at least 6 characters.");
    } else {
      setPassState(false);
    }
  };
  const handleConPass = (e) => {
    setConPass(e.target.value);
    setConPassErr("");
    if (e.target.value.length < 6) {
      setConPassState(true);
      setConPassErr("Your confirm password must be at least 6 characters.");
    } else {
      setConPassState(false);
    }
  };
  const handleCurrentPass = (e) => {
    setCurrentPass(e.target.value);
    setPassCurrentErr("");
  };
  const handlePassword = (e) => {
    e.preventDefault();
    if (!Currentpass.length) {
      setCurrentPassState(true);
      setPassCurrentErr("The Current password Field is required !");
    } else {
      setCurrentPassState(false);
    }
    if (!pass.length) {
      setPassState(true);
      setPassErr("The Password Field is required !");
    } else {
      if (pass.length < 6) {
        setPassState(true);
        setPassErr("Your password must be at least 6 characters.");
      } else {
        setPassState(false);
      }
    }
    if (!conPass.length) {
      setConPassState(true);
      setConPassErr("The Confirm Password Field is required !");
    } else {
      if (pass === conPass) {
        setConPassState(false);
      } else {
        setConPassState(true);
        setConPassErr("Password and confirm password must be same");
      }
    }
    if (pass.length && conPass.length && pass === conPass) {
      const uid = sessionStorage.getItem("user-id");
      axios
        .post(`http://localhost:5000/updatepass${uid}`, {
          Currentpass: Currentpass,
          newpass: pass,
          confirmpass: conPass,
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
            setConPass("");
            setPass("");
            setCurrentPass("");
          } else {
            if (dt.status === 202) {
              setPassCurrentErr(dt.data.Error);
              setCurrentPassState(true);
            }
          }
        });
    } else {
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
        MANAGE PROFILE
      </h3>
      <section className="admin-section">
        <Container>
          <form
            className="roomform"
            onSubmit={handleUpdate}
            data-aos="zoom-in"
            data-aos-duration="1400"
          >
            <div className="form-label-group">
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
                placeholder="Description"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Link
                className="link-style ms-1"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
              >
                Change password?
              </Link>
            </div>
            <div className="text-center">
              <button className="addroom-btn" onClick={handleShow}>
                {" "}
                UPDATE
              </button>
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

export default AdminProfile;
