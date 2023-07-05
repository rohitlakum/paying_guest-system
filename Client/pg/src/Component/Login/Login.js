import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [emailState, setEmailState] = useState(false);
  const [passState, setPassState] = useState(false);
  const [Femail, setFemail] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const [userData, setUserData] = useState([]);
  const [FemailState, setfemailState] = useState(false);
  const [FemailErr, setFemailErr] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.length) {
      setEmailState(true);
      setemailErr("The Email Field is required!");
    } else {
      if (email_pattern.test(email)) {
        setEmailState(false);
      } else {
        setEmailState(true);
        setemailErr("The email you entered is invalid");
      }
    }
    if (!pass.length) {
      setPassState(true);
      setPassErr("The Password Field is  required!");
    } else {
      setPassState(false);
    }
    if (email.length && email_pattern.test(email) && pass.length) {
      axios
        .post("http://localhost:5000/login", {
          email: email,
          password: pass,
        })
        .then((dt) => {
          if (dt.data.LoginNotDone) {
            setPassState(true);
            setPassErr(dt.data.LoginNotDone);
          } else if (dt.data.invalidEmail) {
            setEmailState(true);
            setemailErr(dt.data.invalidEmail);
          } else {
            if (dt.data[0].isbooked === 1) {
              const ID = dt.data[0].admin;
              setUserData(dt.data[0]);
              sessionStorage.setItem(
                "user-info",
                JSON.stringify(dt.data[0].admin)
              );
              sessionStorage.setItem("user-id", JSON.stringify(dt.data[0].id));
              sessionStorage.setItem(
                "isbooked",
                JSON.stringify(dt.data[0].isbooked)
              );

              navigate("/dashboard", { state: { admin: ID } });
            } else {
              sessionStorage.setItem(
                "user-info",
                JSON.stringify(dt.data[0].admin)
              );
              sessionStorage.setItem("user-id", dt.data[0].id);
              navigate("/");
            }
          }
        });
    }
  };
  const handleForgotPass = (e) => {
    e.preventDefault();
    if (Femail.length) {
      axios
        .post("http://localhost:5000/testemail", {
          email: Femail,
        })
        .then((dt) => {
          if (dt.status === 210) {
            setfemailState(true);
            setFemailErr(`${dt.data.Error}`);
          } else {
            if (dt.data.Message) {
              toast.success("We have e-mailed your password reset link", {
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
        });
    } else {
      setFemailErr("The email field is required");
      setfemailState(true);
    }
  };
  const handleEmail = (e) => {
    setemailErr("");

    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setEmail(e.target.value);
    if (email_pattern.test(e.target.value)) {
      setEmailState(false);
    } else {
      setEmailState(true);
      setemailErr("The email you entered is invalid");
    }
  };

  const handleFEmail = (e) => {
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setFemail(e.target.value);
    if (email_pattern.test(e.target.value)) {
      setfemailState(false);
    } else {
      setfemailState(true);
      setFemailErr("The email you entered is invalid");
    }
  };
  const handlePass = (e) => {
    setPass(e.target.value);
    setPassErr("");
  };

  useEffect(() => {
    if (sessionStorage.getItem("user-info")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Header />
      <h3
        className="mt-2 login-heading text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        LOGIN
      </h3>

      <section className="login-section">
        <div className="container">
          <div>
            <div className="login-form-wrapper d-flex justify-content-center ">
              <form
                className="login-form shadow"
                data-aos="zoom-in"
                data-aos-duration="1400"
                onSubmit={handleSubmit}
              >
                <h2 className="title mb-4">Please Login</h2>
                <div>
                  <input
                    type="email"
                    className="form-control rounded border-white mb-3 form-input"
                    name="Email"
                    autoComplete="False"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmail}
                  />
                  {emailState ? (
                    <p
                      className="login-error"
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
                </div>
                {passState ? (
                  <p
                    className="login-error"
                    data-aos="fade-left"
                    data-aos-duration="1100"
                  >
                    {passErr}
                  </p>
                ) : (
                  ""
                )}

                <div className="login-button">
                  <input type="submit" value="Login" />
                </div>
                <div>
                  <p className="login-description mt-3">
                    Don't have an account?{" "}
                    <Link to="/registration">Registration Now</Link>
                    <br></br>
                    <span className="mt-1">
                      <Link
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop"
                      >
                        Forgot Password?
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div
        className="forgot-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Forgot Password
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
            <form className="roomform" onSubmit={handleForgotPass}>
              <div className="form-label-group">
                <input
                  type="email"
                  className="form-control rounded border-white mb-3 form-input"
                  name="Email"
                  autoComplete="False"
                  placeholder="Email Address"
                  value={Femail}
                  onChange={handleFEmail}
                />
                {FemailState ? (
                  <p
                    className="login-error"
                    data-aos="fade-left"
                    data-aos-duration="1100"
                  >
                    {FemailErr}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="text-center">
                <button className="addroom-btn">SUBMIT</button>
              </div>
              
            </form>

          </Container>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
