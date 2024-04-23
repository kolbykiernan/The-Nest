import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';
import '../styles/HomePage.css';
import logo from '../images/Nest-Logo.png';

const HomePage = () => {
  const { currentUser } = useContext(CurrentUser);

  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
      <div className='home-border'>
        <div className="header-link">
        </div> 
        <div className='welcome'>
          <h1>Welcome to The Nest!</h1>
          <img className="hompage-logo" src={logo} alt="two love birds building a heart shaped nest, logo" />
          <h3>Managing your wedding guest list, made simple!</h3>
          <div className='links'>
            {currentUser ? (
              <Link to="/questionnaire" className='btn btn-primary'>Return to Session</Link>
            ) : (
              <>
                <Link to="/sign-up" className='btn btn-primary'>Get Started</Link>
                <Link to="/login" className='btn btn-primary'>Log In</Link>
              </>
            )}
          </div>
        </div>
        <div className="footer-link">
        </div> 
      </div>
    </div>
  );
};

export default HomePage;
