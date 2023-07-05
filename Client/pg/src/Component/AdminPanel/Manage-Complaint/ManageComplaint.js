import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { RiFeedbackLine } from "react-icons/ri";
const ManageComplaint = () => {
  const [Complaint, setComplaint] = useState([]);
  const [UserId, setUserId] = useState("");
  const [Message, setMessage] = useState("");
  useEffect(() => {
    axios.post("http://localhost:5000/getallcomplaint").then((dt) => {
      setComplaint(dt.data);
    });
  });
  const removeComplaint = (x) => {
    axios.delete(`http://localhost:5000/deletecomplaint${x}`).then((dt) => {
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
  };

  const replayComplaint = (x) => {
    setUserId(x)
  };

  const handleReplayComplaint = (e) =>{
    e.preventDefault();
    if (Message.length) {
      const id = UserId;
      axios.post(`http://localhost:5000/replaycomplaint${id}`,{
        message:Message
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
        }
      })
      setMessage("")
    } else {
      toast.error("Message fields is mandatory !", {
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
  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        MANAGE COMPLAINT
      </h3>
      <section
        className="manage-room-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
          {Complaint.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Reply</th>
                  <th>Feedback</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Complaint.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.uid}</td>
                      <td>{e.name}</td>
                      <td>{e.date}</td>
                      <td>{e.message}</td>
                      <td>{e.replay}</td>
                      <td className="text-center">
                        <RiFeedbackLine
                          style={{ cursor: "pointer" }}
                          className="fs-4  text-success"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasTop"
                          aria-controls="offcanvasTop"
                          onClick={() => replayComplaint(e.id)}
                        />
                      </td>

                      <td className="text-center">
                        <ImCross
                          style={{ cursor: "pointer" }}
                          className="fs-5 text-danger"
                          onClick={() => removeComplaint(e.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : null}
        </Container>
      </section>

      <div
        className="review-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Complaint Details
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
            <form className="roomform" onSubmit={handleReplayComplaint}>
              <div className="form-label-group">
                <textarea
                  id="message"
                  className="form-control rounded border-white mb-3 review-text-area"
                  rows={5}
                  cols={50}
                  name="Message"
                  placeholder="Enter Your Message"
                  autoComplete="False"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="addroom-btn">SEND</button>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageComplaint;
