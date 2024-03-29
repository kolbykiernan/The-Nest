import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/Header.css'
const React = require('react')

function Header() {
    return (
        <div className='header'>
            <Navbar className='navbar' style={{ backgroundColor: 'var(--primary-color)' }}>
                <Container fluid>
                    <Navbar.Brand href="/" className='header-font'>The Nest</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid>
                <Nav className='navbar-tabs' fill variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="/questionnaire" active={window.location.pathname === '/questionnaire'}>
                            <span className={window.location.pathname === '/questionnaire' ? 'active-tab' : ''}>Questionnaire</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/guestlist" active={window.location.pathname === '/guestlist'}>
                            <span className={window.location.pathname === '/guestlist' ? 'active-tab' : ''}>Guest List</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/seatingchart" active={window.location.pathname === '/seatingchart'}>
                            <span className={window.location.pathname === '/seatingchart' ? 'active-tab' : ''}>Seating Chart</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </div>
    )
}

export default Header;