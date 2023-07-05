import React, { useEffect, useId, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Table, Offcanvas } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BsCartCheck } from "react-icons/bs";
const GetServices = () => {
  const [serviceData, setServiceData] = useState([]);
  const[isBuy,setIsBuy] = useState(false);
  useEffect(() => {
    axios.post("http://localhost:5000/getextraservice").then((dt) => {
      setServiceData(dt.data);
    });

  });
  const buyService = (x,title) => {
    const userid = sessionStorage.getItem("user-id");
    axios.post("http://localhost:5000/checkisbuy",{
       userid:userid,title:title
    })
    .then((dt)=>{
      if(dt.status===200){
        toast.error(`${dt.data.Message}`, {
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
      else{
        if(dt.status===202){
          axios.post(`http://localhost:5000/servicepayment${x}`).then((dt) => {
            var options = {
              key: "rzp_test_Cl1G7wgRpRqdBD",
              amount: dt.data.amount,
              currency: "INR",
              name: "Apna PG",
              description: "Test Transaction",
              image: "/Image/Logo/apnalogo.png",
              order_id: dt.data.id,
              handler: async (response) => {
                try {
                  axios
                    .post("http://localhost:5000/varifyservicepayment", response)
                    .then((dt) => {
                      if (dt.status === 200) {
                        const uid = sessionStorage.getItem("user-id");
                        axios.post("http://localhost:5000/servicepayment", {
                          uid: uid,
                          id: x,
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
                      }
                    });
                } catch (error) {
                  console.log(error);
                }
              },
              theme: {
                color: "#6f7efd",
              },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
          });
        }
      }
      
    })
 
  };
  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        GET EXTRA SERVICES
      </h3>
      <section
        className="manage-room-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
          {serviceData.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr className="text-center">
                  <th>Index</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Buy</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((e, i) => {
                  return (
                    <tr className="text-center" key={i}>
                      <td>{i + 1}</td>
                      <td>{e.title}</td>
                      <td>{e.description}</td>
                      <td>₹{e.price}</td>
                      <td>
                        <BsCartCheck
                          style={{ cursor: "pointer" }}
                          className="fs-4 text-success"
                          onClick={() => buyService(e.id,e.title)}
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
    </>
  );
};

export default GetServices;
