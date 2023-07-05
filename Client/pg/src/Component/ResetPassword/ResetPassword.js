import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  axios
    .post("http://localhost:5000/testuser", {
      id: id,
      token: token,
    })
    .then((dt) => {
      if (dt.data.Error) {
        navigate("/");
      }
    });
  const [PassState, setPassState] = useState(false);
  const [passErr, setPassErr] = useState("");
  const [Pass, setpass] = useState("");

  const handlePass = (e) => {
    setpass(e.target.value);
    setPassErr("");
  };
  const handleResetPass = (e) => {
    e.preventDefault();

    if (Pass.length && Pass.length >= 6) {
      axios
        .post("http://localhost:5000/resetpass", {
          id: id,
          pass: Pass,
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
      setPassState(false);
    } else {
      if (!Pass.length) {
        setPassState(true);
        setPassErr("The Password Field is required !");
      } else {
        setPassErr("Your password must be at least 6 characters");
        setPassState(true);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Header />
      <h3
        className="mt-2 login-heading text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        RESET PASSWORD
      </h3>
      <section className="resetpass-section">
        <div className="container">
          <div>
            <div className="login-form-wrapper d-flex justify-content-center ">
              <form
                className="login-form shadow"
                data-aos="zoom-in"
                data-aos-duration="1400"
                onSubmit={handleResetPass}
              >
                <h2 className="title mb-4">Enter new password</h2>
                <div></div>
                <div>
                  <input
                    type="password"
                    className="form-control rounded border-white mb-3 form-input"
                    name="password"
                    placeholder="Password"
                    autoComplete="False"
                    value={Pass}
                    onChange={handlePass}
                  />
                </div>
                {PassState ? (
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
                  <input type="submit" value="Submit" />
                </div>
                <p  className="re-description mt-3 text-center">
                  <Link to="/login">Back to login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
