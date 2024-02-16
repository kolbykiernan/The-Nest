import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'
const React = require('react')


function Footer () {
    return(
        <div >
            <Navbar style={{ backgroundColor: 'var(--primary-color)'}}>
                <Container className='footer'>
                    <Navbar.Brand className='footer-font' href="#">
                        <h5>Footer</h5>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer            
            
           