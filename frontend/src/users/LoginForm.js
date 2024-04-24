import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { CurrentUser } from "../contexts/CurrentUser"
import Navbar from 'react-bootstrap/Navbar'; 
import '../styles/HomePage.css'

export default function LoginForm() {

  const navigate = useNavigate()

    const { setCurrentUser } = useContext(CurrentUser)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

      
  
    async function handleSubmit(e) {
      e.preventDefault();
   
        try{
        const response = await fetch(`/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        const data = await response.json()

        if (response.status === 200) {
            setCurrentUser(data.user);
            localStorage.setItem('token', data.token)
            console.log(data.token)
            navigate(`/questionnaire`)
        } else {
            setErrorMessage(data.message)
        }
      } catch (error) {
          console.error("An error occurred:", error);
          setErrorMessage("An error occurred, please try again");
      }
    }

  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
      <div className="header-link">
        <Navbar.Brand href="/" className='header-font'>The Nest</Navbar.Brand>
       </div>  
        <div className='login-border'>        
            <InputGroup className='sign-up-form'>
                <form className='login-info' onSubmit={handleSubmit}>
                    <h1>Welcome!</h1>
                        <h3> Login to continue</h3>
                        {errorMessage !== null
                          ? (
                              <div className="alert alert-danger" role="alert">
                                  {errorMessage}
                              </div>
                          )
                          : null
                        }
                        <div className='login-email-password'>
                          <div>
                              <h5>Email</h5>
                              <Form.Control 
                                type='email' 
                                variant="outline-secondary" 
                                className='sign-up-email'
                                required
                                value={credentials.email}
                                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                id="email"
                                name="email"
                              />                               
                          </div>
                          <div>
                              <h5>Password</h5>
                              <Form.Control 
                                type='password' 
                                variant="outline-secondary" 
                                className='sign-up-password'
                                required
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                id="password"
                                name="password"
                              />                           
                          </div>
                        </div>
                        <div>
                          <input className="btn btn-primary" type="submit" value="Log In" />
                        </div>
                </form>
                <div className='login-button'>
                    <p> Not a part of The Nest yet?</p>
                    <Link to="/sign-up"> Join Now </Link>
                </div>
            </InputGroup>
        </div>
        <div className='footer-link'>

        </div>
    </div>
  )
}
