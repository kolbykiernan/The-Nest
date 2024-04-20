import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/HomePage.css'

export default function SignUpForm() {
  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
        <div className='homepage-border'>        
            <InputGroup className='sign-up-form'>
                    <h1>Welcome to The Nest!</h1>
                        <div className='sign-in-info'>
                            <div>
                                <Form.Control type='text' variant="outline-secondary" className='sign-up-first-name'/>                               
                            </div>
                            <div>
                                <Form.Control type='text' variant="outline-secondary" className='sign-up-last-name'/>                               
                                </div>
                            <div>
                                <Form.Control type='text' variant="outline-secondary" className='sign-up-email'/>                               
                            </div>
                            <div>
                                <Form.Control type='text' variant="outline-secondary" className='sign-up-password'/>                           
                            </div>
                        </div>
                <input className="btn btn-primary" type="submit" value="Sign Up" />
            </InputGroup>
        </div>
    </div>
  )
}
