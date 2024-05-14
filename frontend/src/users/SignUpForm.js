import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'; 
import '../styles/HomePage.css'
import { useState } from "react"
import { useNavigate } from "react-router"
export default function SignUpForm() {

    const navigate = useNavigate()

    const generateUniqueId = () => {

        const uniqueId = Math.random().toString(36).substring(2);
        return uniqueId;
    };

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	})
	async function handleSubmit(e) {
        e.preventDefault();
    
        const uniqueId = generateUniqueId();
    
        sessionStorage.setItem('demoUserId', uniqueId);
    
        try {
            const response = await fetch(`https://welcome-to-the-nest.onrender.com/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (response.ok) {
                navigate(`/login`);
            } else {
                console.error('Sign-up error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);

        }
    }
    

  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
       <div className="header-link">
        <Navbar.Brand href="/" className='header-font'>The Nest</Navbar.Brand>
       </div>       
        <div className='sign-up-border'>        
            <InputGroup className='sign-up-form'>
                        <form className='sign-in-info' onSubmit={handleSubmit}>
                            <h1 >Welcome!</h1>
                                <h3> Join The Nest</h3>
                                <div className="sign-up-email-password">
                                    <div className="sign-up-email-password-top">
                                        <div>
                                            <h5>First Name</h5>
                                            <Form.Control 
                                                type='text' 
                                                variant="outline-secondary" 
                                                className='sign-up-first-name'
                                                required
                                                value={user.firstName}
                                                onChange={e => setUser({ ...user, firstName: e.target.value })}
                                                id="firstName"
                                                name="firstName"
                                            />                               
                                        </div>
                                        <div>
                                            <h5>Last Name</h5>
                                            <Form.Control 
                                                type='text' 
                                                variant="outline-secondary" 
                                                className='sign-up-last-name'
                                                required
                                                value={user.lastName}
                                                onChange={e => setUser({ ...user, lastName: e.target.value })}
                                                id="lastName"
                                                name="lastName"
                                            />                               
                                        </div>
                                    </div>
                                    <div className="sign-up-email-password-bottom">
                                        <div>
                                            <h5>Email</h5>
                                            <Form.Control 
                                                type="email"
                                                variant="outline-secondary" 
                                                className='sign-up-email'
                                                required
                                                value={user.email}
                                                onChange={e => setUser({ ...user, email: e.target.value })}
                                                id="email"
                                                name="email"    
                                            />                               
                                        </div>
                                        <div>
                                            <h5>Password</h5>
                                            <Form.Control 
                                                variant="outline-secondary" 
                                                className='sign-up-password'
                                                type="password"
                                                required
                                                value={user.password}
                                                onChange={e => setUser({ ...user, password: e.target.value })}
                                                id="password"
                                                name="password"
                                            />  
                                        </div>                         
                                    </div>
                                </div>
                                <div className='terms'>
                                    <p> By Clicking 'Sign Up' you agree to the The Nest's <a href ="/about-us">Terms of Use</a></p>
                                </div>
                                <div className='sign-up-button'>
                                    <div>
                                        <input className="btn btn-primary" type="submit" value="Sign Up" />
                                    </div>
                                        <p> or</p>
                                    <div>
                                        <a href = "/questionnaire" className="btn btn-primary" type="submit"> See a Demo </a> 
                                    </div>
                                </div>
                            <div className='already-terms'>
                                <p> Already in The Nest?</p>
                                <Link to="/login"> Log In </Link>
                            </div>
                        </form>
            </InputGroup>
        </div>
        <div className='footer-link'>

        </div>
    </div>
  )
}
