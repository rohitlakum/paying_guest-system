import React from 'react'
import './Home.css'
// import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
const Home = () => {
  return (
    <>
    <Header/>
     <section className='main-row hero-section'>
    <div className="container">
    <div className="row ">
      <div className="test  col-lg-5 col-12 order-lg-1 order-2">
      <h1 className='heading ms-1 mt-5 ' data-aos="fade-up" data-aos-duration="1100" >Welcome To The APNA Paying Guest</h1>
      <h2 className='heading-h2 pt-2'  data-aos="fade-up" data-aos-duration="1100" >Book your hassle-free stay with us, based on what suits you best</h2>
      <Link to="/about"><button className='login1'  data-aos="fade-up" data-aos-duration="1100" >Get Started</button></Link>
      </div>
      <div className="pt-5  col-lg-7 col-12 order-lg-2 order-1" data-aos="zoom-in"  data-aos-duration="1100"><img className='img-fluid home-img animated'  src="./Image/Home/home-img.png" alt=''/></div>
      
      </div>
    </div>  

    </section>
<Footer/>
    </>
  )
}

export default Home

