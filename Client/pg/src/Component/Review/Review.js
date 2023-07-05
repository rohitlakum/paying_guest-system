import React, { useEffect, useState } from 'react'
import  './Review.css';
import Footer from '../Footer/Footer'
import Header from '../Header/Header';
import axios from 'axios';
const Review = () => {
  const reviewData =[
    {
      id:1,
      name:"Ravi Sharma",
      dec:"Actually right now I am staying at APNA PG and I would like to say that it is so good to stay here... I have been here from last 2 months and I feel so good at this place... The rooms are so neat and too good to stay... If we talk about service then we get our personal cupboard, personal bed, 100 Mbps wifi, 3 times food, water purifier, fridge, washing machine and AC... And ofcourse location is also too good... ",
      img:"/Image/Review/review-1.jpg"
    },
    {
      id:2,
      name:"Nikul Raval",
      dec:"I was searching a cheap and better PG in Ahmedabad. APNA PG is a very good PG and the people (owner) are very sweet and co-operative.It is a better place to stay . I really recommended to try to stay here.",
      img:"/Image/Review/review-2.jpg"
    },
    {
      id:3,
      name:"Parash Pandhi",
      dec:"it is one of the best pg which I have seen.it is provide good food and facilities with hygiene. regularly cleaning of rooms. friendly behaviour of staff. I like this PG.",
      img:"/Image/Review/review-3.jpg"
    },
    {
      id:4,
      name:"Parash Pandhi",
      dec:"One of the best PG i came across. They provides the amenities such as laundry, freezer , tasty food, locker room, RO water and much more !!!",
      img:"/Image/Review/review-4.jpg"
    }
  ]
  const[Review,setReview] = useState([])
  useEffect(()=>{
    axios.post("http://localhost:5000/getallreview")
    .then((dt)=>{
      setReview(dt.data)
    })
  })
  return (
    <>
    <Header/>
      <h3 className='mt-2 review text-center' data-aos="fade-down" data-aos-duration="700">REVIEW</h3>
      <section className='review-section'>
      <div className="container">
            <div className="testimonials my-5" data-aos="zoom-in" data-aos-duration="1300">
                
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner shadow">
                    <div className="carousel-item active " >
                      <div className="single-item">
                          <div className="row">
                              <div className="col-md-5">
                                  <div className="profile">
                                      <div className="img-area">
                                          <img src="/Image/Review/review-1.jpg" alt=""/>
                                      </div>
                                      <div className="bio">
                                          <h2>Ravi</h2>
                                        
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="content">
                                      <p><span><i className="fa fa-quote-left"></i></span>I was searching a cheap and better PG in Ahmedabad. APNA PG is a very good PG and the people (owner) are very sweet and co-operative.It is a better place to stay . I really recommended to try to stay here.</p>
                                    
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>

                    {
                      Review.map((e,i)=>{
                        return(
                            <div key={i} className="carousel-item" >
                      <div className="single-item">
                          <div className="row">
                              <div className="col-md-5">
                                  <div className="profile">
                                      <div className="img-area">
                                          <img src={`/img/${e.image}`} alt=""/>
                                      </div>
                                      <div className="bio">
                                          <h2>{e.name}</h2>
                                        
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="content">
                                      <p><span><i className="fa fa-quote-left"></i></span>{e.message}</p>
                                    
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                        )
                      })
                    }
              
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                
            </div>
        </div>
      </section>

    <Footer/>
    </>
  )
}

export default Review
{/* <div className="card" style="width: 18rem;">
  <img src="..." className="card-img-top" alt="...">
  <div className="card-body">
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}