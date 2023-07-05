import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import {RxHamburgerMenu } from 'react-icons/rx'
import {GrClose} from 'react-icons/gr'
import {GrCompliance} from 'react-icons/gr'
import {GiTakeMyMoney} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'
import {TfiControlBackward} from 'react-icons/tfi'
import {BsPersonCheck} from 'react-icons/bs'
import {BsJournalCheck} from 'react-icons/bs'
import {SlPaypal} from 'react-icons/sl'
import {AiOutlineSend} from 'react-icons/ai'
import {BsChatSquareText} from 'react-icons/bs'
import {BiCategoryAlt} from 'react-icons/bi'
import {TbReportSearch} from 'react-icons/tb'
import {MdOutlineFastfood} from 'react-icons/md'
import {RxExit} from 'react-icons/rx'
import {MdOutlineNotificationsActive} from 'react-icons/md'
import './Admin.css'

const Admin = () => {
  const naviagte = useNavigate();
  useEffect(()=>{
    naviagte("aprofile");
  },[]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  const handleLogOut = ()=>{
    sessionStorage.removeItem("user-info")
    sessionStorage.removeItem("isbooked")
    sessionStorage.removeItem("userid")
    naviagte("/")
  }

    return (
      <>
    <div className='logo-con container'>
    <div> <Nav.Link as={NavLink} to='/'><div className="logo fs-3 ms-4 mb-2"><span className='brd'><span className='apna'>APNA</span> PG</span></div></Nav.Link></div>
      <div className='slide-toggle' onClick={()=>handleShow()}>
      {
        show?<GrClose/>:<RxHamburgerMenu />
      }
      </div>
    </div>
  
        <Offcanvas className="canva" show={show} onHide={handleClose}   >
       
         
          
          <Offcanvas.Body onClick={()=>handleClose()} className="slide-link-item" data-aos="fade-right"
        data-aos-duration="200">
            <div className='user-acc '>
                {/* <img className='img-fluid slide-img' src="/Image/Review/review-2.jpg" alt="" /> */}
                <h4 className='ms-2'>Admin Panel</h4>
            </div>
          <Nav.Link as={NavLink} to="aprofile" className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><CgProfile/></span>Manage Profile
          </Nav.Link>
          <Nav.Link as={NavLink} to="guest"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><BsPersonCheck/></span>Manage Guests
          </Nav.Link>

          <Nav.Link as={NavLink} to="managerequest"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><AiOutlineSend/></span>Manage Request
          </Nav.Link> 


          <Nav.Link as={NavLink} to="manageroom" className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><BiCategoryAlt/></span>Manage Rooms
          </Nav.Link>
          
        
          <Nav.Link as={NavLink} to="managefood"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><MdOutlineFastfood/></span>Manage Food Menu
          </Nav.Link>

          <Nav.Link as={NavLink} to="managereview"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><BsChatSquareText/></span>View Reviews
          </Nav.Link>

          <Nav.Link as={NavLink} to="managecomplaint"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><GrCompliance/></span>Manage complaints
          </Nav.Link>  
          
          <Nav.Link as={NavLink} to="givenotice"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><MdOutlineNotificationsActive/></span>Give Notice
          </Nav.Link>

          <Nav.Link as={NavLink} to="manageservice"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><BsJournalCheck/></span>Manage Services
          </Nav.Link>
          <Nav.Link as={NavLink} to="managepayment"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><SlPaypal/></span>Manage Payment
          </Nav.Link>
        
           {/* <Nav.Link as={NavLink} to="makerefund"  className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><GiTakeMyMoney/></span>Make Refund
          </Nav.Link>  */}
           
          <Nav.Link as={NavLink} to="generatereport" className="sidebar-link sidebar-link-hov" >
          <span className='me-2 '><TbReportSearch/></span>Generate Report
          </Nav.Link> 
          <Nav.Link as={NavLink} to="/" className="sidebar-link sidebar-link-hov" >
            <span className='me-2 '><TfiControlBackward/></span>Back To Home
          </Nav.Link> 
           <Nav.Link className="sidebar-link sidebar-link-hov" onClick={handleLogOut} >
            <span className='me-2 '><RxExit
/></span>Log Out
          </Nav.Link> 
      
          </Offcanvas.Body>
        </Offcanvas>
     
      </>
    );
    }
export default Admin

