import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'
const React = require('react')


function Footer () {
    return(
        <div >
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className='footer'>
                    <Navbar.Brand href="#">Footer</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer            
            
           