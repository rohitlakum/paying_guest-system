import React, { useEffect, useState } from "react";
import "./ManageRoom.css";
import { GoPencil } from "react-icons/go";
import { ImCross } from "react-icons/im";
import { GiBunkBeds } from "react-icons/gi";
import Table from "react-bootstrap/Table";
import { Container, Offcanvas } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormData from "form-data";
const ManageRoom = () => {
  const [roomData, setRoomData] = useState([]);
  const [show, setShow] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/getroom")
      .then((dt) => setRoomData(dt.data));
  });

  const handleShow = (userID) => {
    setUserId(userID);
    axios.get(`http://localhost:5000/sendroom${userID}`).then((dt) => {
      setId(dt.data[0].id);
      setTitle(dt.data[0].title);
      setDesc(dt.data[0].description);
      setCategory(dt.data[0].category);
      setCapacity(dt.data[0].capacity);
      setPrice(dt.data[0].price);
      // setImage(dt.data[0].image)
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setId("");
    setTitle("");
    setDesc("");
    setCapacity("");
    setCategory("");
    setPrice("");
    setImage("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      id.length !== 0 &&
      title.length !== 0 &&
      desc.length !== 0 &&
      category.length !== 0 &&
      capacity.length !== 0 &&
      price.length !== 0 &&
      image.length !== 0
    ) {
      const updateForm = new FormData();
      updateForm.append("uroomid", id);
      updateForm.append("utitle", title);
      updateForm.append("udescription", desc);
      updateForm.append("ucategory", category);
      updateForm.append("ucapacity", capacity);
      updateForm.append("uprice", price);
      updateForm.append("FileUpload", image);
      const userID = userId;
      axios
        .put(`http://localhost:5000/updateroom${userID}`, updateForm)
        .then((dt) => {
          if (dt.status === 200) {
            toast.success("Date updated successfully", {
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

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (
      id.length &&
      title.length &&
      desc.length &&
      category.length &&
      capacity.length &&
      price.length
    ) {
      const formdata = new FormData();
      formdata.append("roomid", id);
      formdata.append("title", title);
      formdata.append("description", desc);
      formdata.append("category", category);
      formdata.append("capacity", capacity);
      formdata.append("price", price);
      formdata.append("FileUpload", image);
      axios.post("http://localhost:5000/setroom", formdata).then((dt) => {
          if(dt.data.Message){
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
            if (dt.status === 200) {
              toast.success("Record Added successfully", {
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

  const removeRoom = (id) => {
    const roomId = id;
    axios.delete(`http://localhost:5000/removeroom${roomId}`).then((dt) => {
      if (dt.data.Message) {
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
  return (
    <>
      <ToastContainer />
      <h3
        className="mt-2 manage-room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        MANAGE ROOMS
      </h3>
      <section
        className="manage-room-section"
        data-aos="zoom-in"
        data-aos-duration="1400"
      >
        <Container>
          <h6
            className="new-room"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            New Room
            <GiBunkBeds className="ms-1" />
          </h6>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Room Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>category</th>
                <th>capacity</th>
                <th>vacancy</th>
                <th>Rent</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.id}</td>
                    <td>{e.title}</td>
                    <td>{e.description}</td>
                    <td>{e.category}</td>
                    <td>{e.capacity}</td>
                    <td>{e.vacancy}</td>
                    <td>{e.price}</td>
                    <td>
                      <img
                        style={{ width: 80, height: 65 }}
                        className="img-fluid"
                        src={`/photo/${e.image}`}
                        alt=""
                      />
                    </td>
                    <td>
                      <GoPencil
                        style={{ cursor: "pointer" }}
                        className="fs-4 text-primary"
                        onClick={() => handleShow(e.id)}
                      />
                    </td>
                    <td>
                      <ImCross
                        style={{ cursor: "pointer" }}
                        className="fs-5 text-danger"
                        onClick={() => removeRoom(e.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>

        <Offcanvas
          className="insert-room-canva"
          placement="top"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="mx-auto">
              {" "}
              <h3 style={{ color: "#484848" }} className="manage-room">
                Update Details
              </h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
              <form className="roomform" onSubmit={handleUpdate}>
                <div className="form-label-group">
                  <input
                    type="text"
                    name="uroomid"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Room id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />

                  <input
                    type="text"
                    name="utitle"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <input
                    type="text"
                    name="udescription"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />

                  <input
                    type="text"
                    name="ucategory"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <input
                    type="text"
                    name="ucapacity"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Total capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />

                  <input
                    type="text"
                    name="uprice"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <input
                    type="file"
                    name="FileUpload"
                    className="form-control room-control ps-3 mb-3"
                    placeholder="Select File"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <button className="addroom-btn">Update</button>
              </form>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
      </section>

      <div
        className="addroom-ofset offcanvas offcanvas-top"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
      >
        <div className="offcanvas-header">
          <h3 style={{ color: "#484848" }} className="manage-room mx-auto">
            Room Details
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
            <form className="roomform" onSubmit={handleAddRoom}>
              <div className="form-label-group">
                <input
                  type="text"
                  name="roomid"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Room id "
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />

                <input
                  type="text"
                  name="title"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <input
                  type="text"
                  name="description"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />

                <input
                  type="text"
                  name="category"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />

                <input
                  type="text"
                  name="capacity"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Total capacity"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                />

                <input
                  type="text"
                  name="price"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />

                <input
                  type="file"
                  name="FileUpload"
                  className="form-control room-control ps-3 mb-3"
                  placeholder="Select File"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <button className="addroom-btn">Add Room</button>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ManageRoom;
