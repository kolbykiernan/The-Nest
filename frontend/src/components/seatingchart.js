import React from 'react'
import '../styles/questionnaire.css';
import Header from '../default-views/header'
import Footer from '../default-views/Footer'
import logo from '../images/The-Nest-Logo.png';


export default function Seatingchart() {
  return (
    <div>
      <Header />
        <div className='seating-chart'>
          <h4>
            {"We're still in beta. Seating chart coming soon!"} 
          </h4>
          <img src={logo} alt="two lovebirds building a heart shaped nest"/>
        </div>
      <Footer />
    </div>
  )
}
