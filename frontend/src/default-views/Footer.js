import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/Footer.css'
const React = require('react')


function Footer () {
    return(
        <div className='footer'>

                <Container className='footer-bar' >
                    <Navbar.Brand className='footer-font' href="#">
                        <h5>Footer</h5>
                    </Navbar.Brand>
                </Container>

        </div>
    )
}

export default Footer            
            
           