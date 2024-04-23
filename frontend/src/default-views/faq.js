import React from 'react'
import Navbar from 'react-bootstrap/Navbar'; 

export default function FAQ () {
  return (
    <div className="body" style={{ backgroundColor: 'var(--primary-color)', width: '100%', height: '100vh' }}>
        <div className='faq-border'>
            <div className="header-link">
                <Navbar.Brand href="/" className='header-font'>The Nest</Navbar.Brand>
            </div> 
            <div className="faq-center">
                <div className='welcome-faq'>       
                    <div className="about-us-header-faq">   
                        <h1 >FAQ</h1>
                    </div> 
                    <div className="about-us-container-faq">   
                        <div>
                          <p><b>How do I sign up or register for the application?</b></p>
                          <p>On the home page, click <i>Get Started</i> and fill out the Sign Up form. From there, you will be prompted to log in.</p>
                        </div>
                        <div>
                          <p><b>How do I log out of my profile?</b></p>
                          <p>For now, there isn't functionality to log out. You will automatically be logged out after 24 hours. However, when you log back in, your info will still be there!</p>
                        </div>
                        <div>
                          <p><b>I forgot my password. How can I reset it?</b></p>
                          <p>If you forgot your password, please email us at <a href="mailto:kolbykiernan@gmail.com">kolbykiernan@gmail.com</a>, and I will help you reset your password.</p>
                        </div>
                        <div>
                          <p><b>Is it necessary to fill out all sections?</b></p>
                          <p>If a section or input is mandatory to fill out, you will be prompted with an alert message. Otherwise, you can skip it.</p>
                        </div>
                        <div>
                          <p><b>Can I delete or edit categories?</b></p>
                          <p>For now, you cannot delete or edit your categories. However, you don't need to use the categories. This functionality will be coming soon.</p>
                        </div>
                        <div>
                          <p><b>Why are the categories important?</b></p>
                          <p>In the future, these categories will help create a seating chart, and those who are in the same category will be prioritized to be seated at the same table. When it comes to building the guest list, the categories help you add guests in segments so that you aren't overwhelmed adding all guests.</p>
                        </div>
                        <div>
                          <p><b>What is the purpose of <i>Bride / Groom / Mutual</i>?</b></p>
                          <p>Similar to the categories, this will be helpful to group guests for your seating arrangements, but for now, it also allows you to compartmentalize your guests.</p>
                        </div>
                        <div>
                          <p><b>Is the app mobile and tablet friendly?</b></p>
                          <p>Though creating a wedding guest list is probably easier on a computer, we did our best to make this as mobile-friendly. If you see limitations, please let us know, and in the meantime, try switching to a computer.</p>
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
