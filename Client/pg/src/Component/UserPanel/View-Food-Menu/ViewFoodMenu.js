import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
const ViewFoodMenu = () => {
  const [Food, setFood] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/getfood").then((dt) => setFood(dt.data));
  });
  return (
    <>
     <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        VIEW FOODMENU
      </h3>
      <section
        className="manage-room-section mt-5"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container className="mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {Food.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.date}</td>
                    <td>{e.morning}</td>
                    <td>{e.afternoon}</td>
                    <td>{e.evening}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  )
}

export default ViewFoodMenu