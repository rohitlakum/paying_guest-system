import React, { useEffect, useMemo, useState } from "react";
import "./Rooms.css";
import {BsPersonCheck} from 'react-icons/bs'
import {GiBunkBeds} from 'react-icons/gi'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
const Rooms = () => {
//   const Room_Data = [
//     {
//         id:101,
//         title:"Room-101 (Non Ac)",
//         category:"Non Ac",
//         noSharing:2,
//         dec:"This is Two sharing Non Ac Room.",
//         price:7500,
//         img:"/Image/Rooms/2-sharing.webp"
//     },
//     {
//       id:102,
//       title:"Room-102 (Non Ac)",
//       category:"Non Ac",
//       noSharing:0,
//       dec:"This is Three sharing Non Ac Room.",
//       price:7000,
//       img:"/Image/Rooms/3-sharing.jpeg"
//   },
//   {
//     id:103,
//     title:"Room-103 (Non Ac)",
//     category:"Non Ac",
//     noSharing:4,
//     dec:"This is Four sharing Non Ac Room.",
//     price:6500,
//     img:"/Image/Rooms/4-sharing.jpg"
// },
// {
//   id:104,
//   title:"Room-104 (Ac)",
//   category:"Ac",
//   noSharing:0,
//   dec:"This is Two sharing Ac Room.",
//   price:9000,
//   img:"/Image/Rooms/4-sharing.jpg"
// },
// {
//   id:105,
//   title:"Room-105 (Ac)",
//   category:"Ac",
//   noSharing:3,
//   dec:"This is Three sharing Ac Room.",
//   price:8500,
//   img:"/Image/Rooms/2-sharing.webp"
// },
// {
// id:106,
// title:"Room-106 (Ac)",
// category:"Ac",
// noSharing:4,
// dec:"This is Four sharing Ac Room.",
// price:8000,
// img:"/Image/Rooms/3-sharing.jpeg"
// },

// ];

const[roomData,setRoomData] = useState([]);
const[room,setroom] = useState([]);
const[selectedCategory,setSelectedcategory] = useState("");
const[selectSharing,setSelectedSharing] = useState();

const Navigate = useNavigate();

useEffect(()=>{
  axios.get("http://localhost:5000/getroom")
  .then((dt)=>{
    setRoomData(dt.data)
    setroom(dt.data)
  });
  
},[])

// Get Unique data for Room category...
const uniq_cate = new Set(roomData.map((e)=>{
  return e.category;
}))


// Convert set type category to array type
const newUniq_value = [...uniq_cate];


const newMemo = useMemo((function filterData(){
  if(selectedCategory === "All" || selectSharing ==="All")
  {
    setroom(roomData)
    return;
  }
 const updatedData = roomData.filter((e)=>{
  return e.category===selectedCategory;
 })

//  (e.category===selectedCategory) && (e.category===selectedCategory && e.noSharing === parseInt(selectSharing))

  setroom(updatedData);
  // console.warn(newUniq_value)
}
),[selectedCategory])

const navigate = useNavigate();

const handleBook = (item,roomid,rent)=>{
  sessionStorage.getItem("user-info")?
  sessionStorage.getItem("isbooked") ?toast.error('You alredy booked bed!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }) :
  item !==0?navigate("/condition",{state:{roomid:roomid,rent:rent}}):toast.error('There is no vacancy!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
    :
    navigate("/login")
}

  return (
    <>
     <ToastContainer />
    <Header/>
      <h3
        className="mt-2 room text-center"
        data-aos="fade-down"
        data-aos-duration="700"
      >
        ROOMS
      </h3>
      <section className="room-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div
                className="first-drop"
                data-aos="zoom-in"
                data-aos-duration="1100"
              >
                <h5 className="room-h5">Room Category:</h5>
                <select className="f-drop"  onChange={(e)=>setSelectedcategory(e.target.value)}>
                  <option>All</option>
                 {
                  newUniq_value.map((e,i)=>{
                    return(
                      <option key={i}>{e}</option>
                    )
                   })
                  }
                 
                </select>
               
             
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="container mt-5">
        <div
          className="row room-row ">
  {
    room.map((e,i)=>{
      return(
        <div key={i} className="col-lg-6 mt-2 mb-3" data-aos="zoom-in" data-aos-duration="1400">
        <div className="card p-3 room-card">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`/photo/${e.image}`}
                className="img-fluid rounded"
                alt="..."
              />
            </div>
            <div className="col-md-5">
              <div className="card-body">
                <h5 className="card-title">{e.title}</h5>
                <p className="card-text">
               {e.description}
                </p>
             
           <div className="capa">
           <p><BsPersonCheck/> Capacity :{e.capacity}
           </p>
            <p><GiBunkBeds/> Vacancy: {e.vacancy}
           </p>
            </div>
              </div>
            </div>
            <div className="col-md-3 text-end price-btn">
              <h5 className="card-text ms-3 price-col" style={{color:"#222222"}}>₹{e.price}/-</h5>
             {/* <Link to="/selectbed" state={{id:e.id}}><button className="book-btn">Book Now</button></Link>  */}
            <button className="book-btn" onClick={()=>handleBook(e.vacancy,e.id,e.price)} >Book Now</button>
            </div>
          </div>
        </div>
      </div>
      )
    })
  }
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Rooms;



