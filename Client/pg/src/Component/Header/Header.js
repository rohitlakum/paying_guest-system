import React, { useState } from "react";
import './Header.css';
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav ,Navbar} from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import {GrClose} from 'react-icons/gr'
const Header = () => {
  const[isOpen,setIsOpen] = useState(false);
  const handleClick= ()=>{
    setIsOpen(!isOpen);
  }
  const closeMenu=()=>{
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const handlelogout = ()=>{
    sessionStorage.removeItem("user-info")
    sessionStorage.removeItem("isbooked")
    sessionStorage.removeItem("userid")
    navigate("/")
  }
  return (
    <>
        {/* <nav className="nav mt-1 " > */}
        <Navbar className="nav" sticky="top" >
      <Container>
        <Nav.Link as={NavLink} to='/'><div className="logo fs-3 ms-4"><span className='brd'><span className='apna'>APNA</span> PG</span></div></Nav.Link>
          <div className={isOpen?"nav-items-mobile":"nav-items ms-auto"}onClick={()=>closeMenu()} >
          <Nav.Link as={NavLink} to="/" className="px-2 nav-links hov" >
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" className="px-2 nav-links hov">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/service" className="px-2 nav-links hov">
            Service
          </Nav.Link>
          <Nav.Link as={NavLink} to="/rooms" className="px-2 nav-links hov" >
            Rooms
          </Nav.Link>
          <Nav.Link as={NavLink} to="/review" className="px-2 nav-links hov">
            Review
          </Nav.Link>
        {
          sessionStorage.getItem("isbooked")?
          <Nav.Link as={NavLink} to="/dashboard" className="px-2 nav-links hov">
          Dashboard
        </Nav.Link>:null
        }
          <Nav.Link as={NavLink} to="/contact" className="px-2 nav-links hov">
            Contact
          </Nav.Link>

         {
          sessionStorage.getItem('user-info') ?<NavLink> <button className="login" onClick={handlelogout} >logout</button></NavLink> :
          <>
           <NavLink to="/login">
            <button className="login">Login</button>
          </NavLink>
          </>
         }
          </div>
          <div className="toggle-btn" onClick={()=>handleClick()}>
            {
              isOpen?<GrClose/>:<RxHamburgerMenu />
            }
          </div>
        {/* </nav> */}
      </Container>
          </Navbar>
    </>
  );
};

export default Header;
