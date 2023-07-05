import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./About.css"
const About = () => {
  return (
    <>
    <Header/>
      <h3 className='mt-2 abt-us text-center' data-aos="fade-down" data-aos-duration="700">ABOUT US</h3>
    <section className='about-section'>
    <div className='container'>
      <div className='row'>
        <div className=' column col-lg-5 col-12 order-lg-1 order-2'>
         
          <p className='about-para'  data-aos="fade-up" data-aos-duration="1100">
          Move into<span> APNA P.G. Accommodation</span>, a professionally managed Paying guest in the Navrangpura, Ahmedabad. Located in a safe neighborhood, Our male PG offers various modern amenities for your comfort, such as Food, Power Backup, Wi-Fi etc. Our PG has triple, four and other sharing rooms. Our PG is nearby major educational and commercial hubs.Please contact us to book your space. if you are new in town and also looking for safe, clean and affordable paying guest accommodation,we are here to serve you do visit us.
</p>
        </div>

        <div className='column col-lg-7 col-12 order-lg-2 order-1' data-aos="zoom-in"  data-aos-duration="1100">
        <img className="img-fluid about-img-animated " src="./Image/About/about-logo3.png" alt='' />
        <br></br>
        <br></br>
        </div>
    </div>
    </div>
    </section>
    <Footer/>
    </>
    
  )
}

export default About