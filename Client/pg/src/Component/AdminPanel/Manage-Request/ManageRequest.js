import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDoneAll} from "react-icons/md";
import { MdDownloadDone} from "react-icons/md";
import { FcCancel} from "react-icons/fc";
const ManageRequest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cancellationalldata")
      .then((dt) => setData(dt.data));
  });

  const approverequest = (id)=>{
    axios.post(`http://localhost:5000/approverequest${id}`)
    .then((dt) => {
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
    });
  }

  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        MANAGE REQUEST
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
          <Table striped bordered hover responsive className="mt-5">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                {/* <th>User id</th> */}
                <th>Room no</th>
                <th>Name</th>
                <th>Booking date</th>
                <th>Booking duration</th>
                <th>Is approved</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr className="text-center" key={i}>
                    <td>{i + 1}</td>
                    {/* <td>{e.uid}</td> */}
                    <td>{e.roomid}</td>
                    <td>{e.name}</td>
                    <td>{e.bdate}</td>
                    <td>{e.duration}</td>
                    <td>{e.approve===1? <MdDownloadDone
                        className="fs-4 text-success"
                      />:<FcCancel className="fs-4"/>}</td>
                    <td>
                      <MdOutlineDoneAll
                        style={{ cursor: "pointer" }}
                        className="fs-4 text-success"
                        onClick={() => approverequest(e.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </section>
   
    </>
  );
}

export default ManageRequest