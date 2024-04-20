import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'
import logo from '../images/Nest-Logo.png';



const HomePage = () => {
    return (
            <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
                <div className='homepage-border'>
                    <div className='welcome'>
                        <h1>Welcome to The Nest!</h1>
                        <img src={logo} alt="two love birds building a heart shaped nest, logo"/>
                        <br/>
                        <br/>
                        <h3>Organizing your wedding guest list has never been easier!</h3>
                    </div>
                    <div className='links'>
                        <Link to="/sign-up" className='btn btn-primary'> Get Started </Link>
                        <Link to="/login" className='btn btn-primary'> Log In </Link>
                    </div>
                </div>
            </div>
    );
};

export default HomePage;