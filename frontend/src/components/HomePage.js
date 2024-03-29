import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'
import logo from '../images/Nest-Logo.png';



const HomePage = () => {
    return (
            <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
                <div className='welcome'>
                    <h1>Welcome to The Nest!</h1>
                    <img src={logo} alt="two love birds building a heart shaped nest, logo"/>
                    <br/>
                    <br/>
                    <h3>Organizing your guest list has never been easier!</h3>
                </div>
                <div className='links'>
                    <Link to="/questionnaire" className='btn btn-primary'> Log In </Link>
                    <Link to="/questionnaire" className='btn btn-primary'> Get Started </Link>
                </div>
            </div>
    );
};

export default HomePage;