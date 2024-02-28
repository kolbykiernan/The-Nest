import React, { useState } from 'react'
import Header from '../default-views/header'
import Footer from '../default-views/Footer'
import CategoryForm from './CategoryForm';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/questionnaire.css';

const Questionnaire = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({});
    const [questions] = useState([
      { id: 1, text: "What is your wedding date?", type: "date"},
      { id: 2, text: "What is the name of your venue?", type: "text"},
      { id: 3, text: "What is the maximum capacity at your venue?", type: "number"},
      { id: 4, text: "How many guests do you plan to invite?", type: "number"},
      { id: 5, text: "What is the ideal number of guests to attend?", type: "number"},
      { id: 6, text: "How much does it cost per guest?", type: "number"},
      { id: 7, text: "Next we're going to categorize how you know your guests", type: "categoryForm"},
      { id: 8, text: "Select your categories", type: "categoryForm"},
    ]);

    const handleNext = () => {
        const nextIndex = currentPage + 1;
        setCurrentPage(nextIndex);
      };

      const handlePrev = () => {
        const nextIndex = currentPage - 1;
        setCurrentPage(nextIndex);
      };

    
      const handleAnswer = (questionId, answer) => {
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: answer
        }));
      };
    
      const LimitedTextView = ({ text }) => {
        const [expanded, setExpanded] = useState(false);
    
        const toggleExpanded = () => {
          setExpanded(!expanded);
        };
    
        return (
          <div className='question-label-category-info' style={{ backgroundColor: 'var(--secondary-color)'}}>
            <div style={{ maxHeight: expanded ? 'none' : '50px', overflow: 'hidden' }}>
              {text}
            </div>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" onClick={toggleExpanded}>
              {expanded ? '↑ Collapse' : '↓ Expand'}
            </Dropdown.Toggle>
          </div>
        );
      };

      const renderQuestion = (question) => {
        const answer = answers[question.id] || '';
        switch (question.type) {
          case "date":
            return (
              <div>
                <label className='question-label' style={{ backgroundColor: 'var(--secondary-color)'}}>{question.text}</label>
                <input className='question-input' type="date" value={answer} onChange={(e) => handleAnswer(question.id, e.target.value)} required/>
              </div>
            );
          case "text":
            return (
              <div>
                <label className='question-label' style={{ backgroundColor: 'var(--secondary-color)'}}>{question.text}</label>
                <input className='question-input' type="text" value={answer} onChange={(e) => handleAnswer(question.id, e.target.value)} required/>
              </div>
            );
          case "number":
            return (
              <div>
                <label className='question-label' style={{ backgroundColor: 'var(--secondary-color)'}}>{question.text}</label>
                <input className='question-input' type="number" value={answer} onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))} required/>
              </div>
            );
            case "categoryForm":
              return (
                <div key={question.id}>
                  <label className='question-label-category' style={{ backgroundColor: 'var(--secondary-color)'}}>{question.text}</label>
                  <LimitedTextView text="It's best if you are together for this portion! Think of how you both know all of the people that will come to your wedding. The average person has between 4 - 6 categories that the majorioty of their guests can fall into. Maybe they're the same as your partner, or maybe they are unique to one of you. You can make groups, even if your partner doesn't have friends from that category! We’ve chosen some options below to get you started, but think hard about this, as this will influence your seating chart! There may still be a few that may not fit into any category. For those, choose ‘Other’."/>  
                  <CategoryForm className='question-input' type="text" value={answer} onChange={(e) => handleAnswer(question.id, e.target.value)} required />
                </div>
              );
          default:
            return null;
        }
      };
    
        return(
            <div className='questionnaire'>
                <Header />
                    <div className='questions'>
                        <div className='question'>
                          {renderQuestion(questions[currentPage])}
                        </div>
                        {currentPage < questions.length - 1 && (
                            <div>
                              <Button className="button" variant="primary" onClick={handlePrev}>Prev</Button>{' '}
                              <Button className="button" variant="primary" onClick={handleNext}>Next</Button>{' '}
                            </div>
                        )}
                        {currentPage === questions.length - 1 && (
                              <Button className="button" variant="primary" onClick={() => console.log(answers)}>Submit</Button>
                        )}
                             
                    </div>
                <Footer />
            </div>
        )
  }

export default Questionnaire;
    
