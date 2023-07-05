import axios from "axios";
import React, { useEffect, useState } from "react";
import {Container,Table} from 'react-bootstrap'
const ViewService = () => {
    const [data, setData] = useState([]);
  useEffect(() => {
    const id = sessionStorage.getItem("user-id");
    axios
      .post(`http://localhost:5000/servicebuyer${id}`)
      .then((dt) => setData(dt.data)); 
   
  },[]);

  return (
    <>
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        VIEW SERVICE DETAIL
      </h3>
      <section
        className="manage-guest-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
       <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr className="text-center">
                    <th>Index</th>
                    <th>Service name</th>
                    <th>Booking date</th>
                    <th>Booking duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e, i) => {
                    return (
                      <tr className="text-center" key={i}>
                        <td>{i + 1}</td>
                        <td>{e.service}</td>
                        <td>{e.bdate}</td>
                        <td>{e.duration}</td>
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

export default ViewService