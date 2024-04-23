import React from 'react'
import AboutUsPic from '../images/madi-and-kolby.jpeg'
import Navbar from 'react-bootstrap/Navbar'; 
import '../styles/HomePage.css';

export default function AboutUs () {
  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
        <div className='homepage-border'>
            <div className="header-link">
                <Navbar.Brand href="/" className='header-font'>The Nest</Navbar.Brand>
            </div> 
            <div className="about-us-center">
                <div className='welcome'>       
                    <div className="about-us-header">   
                        <h1 >About Us!</h1>
                    </div> 
                    <div className="about-us-container">   
                        <img src={AboutUsPic} className='about-us-image' alt="pic"/>
                        <div className="about-us-text">
                            <p>For those who have found their way to this page, I want to extend a heartfelt thank you for taking the time to explore <i><b>The Nest</b></i>. My name is Kolby Kiernan, and about a year ago, I embarked on a journey to become a software developer. During this time, my girlfriend Madi and I have been delving deeper into our relationship, leading to discussions about our wedding and guest list. With both of us having large families and many friends, what should have been an exciting conversation often became overwhelming as we tried to make difficult decisions about who should attend our special day.</p>
                            <p>In an era where the cost of weddings has soared, having a tool to help organize yours and your significant other's "Nest" has been invaluable. <i>The Nest</i> has not only assisted us in making decisions about our wedding but has also allowed us to enjoy the process with less stress.</p>
                            <p>Although I've undertaken several projects as a developer, <i>The Nest</i> represents my first significant endeavor in creating a unique and valuable app. I take immense pride in this project and hope that your experience with it has been as fulfilling as mine. While this will always hold a special place in my heart, it's only the beginning of my journey, and I'm eager to continue building software to assist others.</p>
                            <p>If you have any questions or comments about this project, or wish to discuss employment opportunities, please don't hesitate to email me at <a href="mailto:kolbykiernan@gmail.com">kolbykiernan@gmail.com</a>.</p>
                            <p>Cheers! 🥂</p>
                        </div>
                    </div>


                </div>  
            </div>
            <div className='footer-link'>
            
            </div>   
        </div>
    </div>
  )
}