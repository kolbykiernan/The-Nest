import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
const React = require('react')

function Header () {
    return(
        <div>
            <Navbar style={{ backgroundColor: 'var(--primary-color)'}}>
                <Container >
                    <Navbar.Brand href="/">Wedding App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Nav fill variant="tabs">
                <Nav.Item>
                    <Nav.Link href="/questionnaire">Questionnaire</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Guest List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Seating Chart</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Header