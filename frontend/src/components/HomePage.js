import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
    return (
        <Router>
            <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
                <div className='welcome'>
                    <h1>Welcome to WeddingApp</h1>
                    <h3>Organizing your guest list has never been easier!</h3>
                </div>
                <div className='links'>
                    <Link to="/logIn" className='btn btn-primary'> Log In </Link>
                    <Link to="/getStarted" className='btn btn-primary'> Get Started </Link>
                </div>
            </div>
        </Router>
    );
};

export default HomePage;