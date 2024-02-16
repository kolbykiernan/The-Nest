import Header from './header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './questionnaire.css'

const React = require('react')

const CustomDateInput = ({ placeholder, ...props }) => {
    return (
      <Form.Control
        type="date"
        {...props}
        onFocus={(e) => e.target.type = 'date'}
        onBlur={(e) => e.target.type = 'text'}
        placeholder={placeholder}
      />
    );
  };


function Questionnaire () {
    return(
        <div className='questionnaire'>
            <Header />
            <div className='questions' >
                <Navbar className="question-container" style={{ backgroundColor: 'var(--secondary-color)'}}>
                    <Container>
                        <h1 className="question">
                            Let's start with the important day!
                        </h1>
                    </Container>
                </Navbar>
                <br/>
                <CustomDateInput type="text" placeholder="What is your wedding date?"/>
                <br/>
                <Form.Control  type="text" placeholder="What is the name of your venue?" />
                <br/>
                <Form.Control  type="number" placeholder="What is the maximum capacity of your venue?" />
                <br/>
                <Form.Control  type="number" placeholder="How many guests do you plan to invite?" />
                <br/>
                <Form.Control  type="number" placeholder="What is the target number of guests you'd have attend?" />
                <br/>
                <Form.Control  type="number" placeholder="How much does it cost per guest?" />
               
                <Button className="button" variant="primary">Next</Button>{' '}
            </div>
                <Footer />
        </div>
        )
    }
    
export default Questionnaire