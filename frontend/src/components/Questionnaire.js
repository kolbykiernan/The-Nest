import React, { useState, useEffect } from 'react'
import Header from '../default-views/header'
import Footer from '../default-views/Footer'
import CategoryForm from './Questions/CategoryForm';
import BrideGroom from './Questions/BrideGroom';
import MaidOfHonor from './Questions/maidOfHonor';
import Groomsmen from './Questions/Groomsmen';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import EverybodyElse from './Questions/Everybody_Else';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import '../styles/questionnaire.css';


const Questionnaire = () => {

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

    const [answers, setAnswers] = useState({});
    const [questions] = useState([
      { id: 1, text: "What is your wedding date?", type: "date"},
      { id: 2, text: "What is the name of your venue?", type: "text"},
      { id: 3, text: "What is the maximum capacity at your venue?", type: "number"},
      { id: 4, text: "How many guests do you plan to invite?", type: "number"},
      { id: 5, text: "What is the ideal number of guests to attend?", type: "number"},
      { id: 6, text: "How much does it cost per guest?", type: "number"},
      { id: 7, text: "Let's start with the lovebirds!", type: "brideGroom"},
      { id: 8, text: "Next we're going to categorize how you know your guests", type: "categoryForm"},
      { id: 9, text: "Bridesmaids", type: "maidOfHonor"},
      { id: 10, text: "Groomsmen", type: "Groomsmen"},
      { id: 11, text: "Everybody Else", type: "Everybody Else"},
 
    ]);

    const [categories, setCategories] = useState([]);


    useEffect(() => {
      // Fetch categories from the backend when the component mounts
      fetchCategories();
    }, []);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectChange = (e) => {
      setSelectedCategory(e.target.value);
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data); // Assuming the response contains an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const handlePrev = () => {
      const nextIndex = currentPage - 1;
      setCurrentPage(nextIndex);
    };

    const handleNext = () => {
      if (questions[currentPage].id === 7) {
        submitWeddingData();
      }
        const nextIndex = currentPage + 1;
        setCurrentPage(nextIndex);
    };

      const submitWeddingData = async () => {
        console.log(answers)
        try {
          const formData = {
            date: answers[1],
            venue: answers[2],
            capacity: answers[3],
            invites: answers[4],
            attendance: answers[5],
            cost: answers[6],
            brideFirstName: answers['brideFirstName'],
            brideLastName: answers['brideLastName'], 
            brideSelection: answers['brideSelection'], 
            groomFirstName: answers['groomFirstName'], 
            groomLastName: answers['groomLastName'], 
            groomSelection: answers['groomSelection']
          };
      
          const response = await axios.post('http://localhost:3000/api/', formData);
          console.log('Form submitted successfully:', response.data);
          // Display a success message or perform any other actions upon successful form submission
        } catch (error) {
          console.error('Error submitting form:', error);
          // Display an error message or perform any other actions upon form submission failure
        }
      }

      const handleAnswer = (questionId, answer) => {
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: answer
        }));
      };

    const [rowsBridesmaids, setRowsBridesmaids] = useState(Array.from({ length: 10 }, () => ({plusOneSelectedBridesmaids: ''})));
    const [plusOneValueBridesmaids, setPlusOneValueBridesmaids] = useState(Array.from({ length: 10 }, () => 1));
    const [plusOneSelectedBridesmaids, setPlusOneSelectedBridesmaids] = useState('');
   

    const handleRangeChangeBridesmaids = (index, e) => {
      const newValuesBridesmaids = [...plusOneValueBridesmaids];
      newValuesBridesmaids[index] = parseFloat(e.target.value);
      setPlusOneValueBridesmaids(newValuesBridesmaids);
    };

    const handlePlusOneSelectChangeBridesmaids = (index, value) => {
      setPlusOneSelectedBridesmaids(value);
      setRowsBridesmaids(prevRowsBridesmaids => {
        const updatedRowsBridesmaids = [...prevRowsBridesmaids];
        updatedRowsBridesmaids[index] = { ...updatedRowsBridesmaids[index], plusOneSelectedBridesmaids: value === 'Yes' };
        return updatedRowsBridesmaids;
      });
    };
  
    const addRowBridesmaids = () => {
      setRowsBridesmaids(prevRowsBridesmaids => [...prevRowsBridesmaids, {plusOneSelectedBridesmaids: ''}]);
      setPlusOneValueBridesmaids(prevValuesBridesmaids => [...prevValuesBridesmaids, 1]);
    };

    const [rowsGroomsmen, setRowsGroomsmen] = useState(Array.from({ length: 10 }, () => ({plusOneSelectedGroomsmen: ''})));
    const [plusOneValueGroomsmen, setPlusOneValueGroomsmen] = useState(Array.from({ length: 10 }, () => 1));
    const [plusOneSelectedGroomsmen, setPlusOneSelectedGroomsmen] = useState('');
   

    const handleRangeChangeGroomsmen = (index, e) => {
      const newValuesGroomsmen = [...plusOneValueGroomsmen];
      newValuesGroomsmen[index] = parseFloat(e.target.value);
      setPlusOneValueGroomsmen(newValuesGroomsmen);
    };

    const handlePlusOneSelectChangeGroomsmen = (index, value) => {
      setPlusOneSelectedGroomsmen(value);
      setRowsGroomsmen(prevRowsGroomsmen => {
        const updatedRowsGroomsmen = [...prevRowsGroomsmen];
        updatedRowsGroomsmen[index] = { ...updatedRowsGroomsmen[index], plusOneSelectedGroomsmen: value === 'Yes' };
        return updatedRowsGroomsmen;
      });
    };
  
    const addRowGroomsmen = () => {
      setRowsGroomsmen(prevRowsGroomsmen => [...prevRowsGroomsmen, {plusOneSelectedGroomsmen: ''}]);
      setPlusOneValueGroomsmen(prevValuesGroomsmen => [...prevValuesGroomsmen, 1]);
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
              <div className='questionnaire-questions'>
                <label 
                  className='question-label' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <input 
                  className='question-input' 
                  type="date" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  required/>
              </div>
            );
          case "text":
            return (
              <div className='questionnaire-questions'>
                <label 
                  className='question-label' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <input 
                  className='question-input' 
                  type="text" value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  required/>
              </div>
            );
          case "number":
            return (
              <div className='questionnaire-questions'>
                <label 
                  className='question-label' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <input 
                  className='question-input' 
                  type="number" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))} 
                  
                  required/>
              </div>
            );
          case "categoryForm":
            return (
              <div className='questionnaire-questions' key={question.id}>
                <label 
                  className='question-label-category' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <LimitedTextView 
                    text="It's best if you are together for this portion! Think of how you both know all of the people that will come to your wedding. The average person has between 4 - 6 categories that the majorioty of their guests can fall into. Maybe they're unique to one of you or maybe they are mutual. For example: Let's say you and your partner both want to invite friends from high school, but you didn't go to the same high school. You only need to fill that category out once because we will be assigning which partner they originated from or if they are mutual later. Take a little time to consider these as this will influence your seating chart! There may still be a few that don't fit into any category. For those, you can leave the category blank, or create 'Other'."
                />
                <CategoryForm 
                  fetchCategories={fetchCategories} 
                  categories={categories} 
                  className='question-input' 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  
                  required 
                />
              </div>
            );
          case "brideGroom":
            return (
              <div className='questionnaire-questions'>
                <label 
                  className='question-label' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <BrideGroom 
                  className='question-input' 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  handleAnswer={handleAnswer}
                  required
                />
              </div>
            );
          case "maidOfHonor":
            return (
              <div className='question-banner'>
                <label 
                  className='question-label-wedding-party' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <label
                  className='question-label-instructions' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                  >
                    For this section, let's just focus on the wedding party and their plus-one's. If there are other guests that you'd like to add along with these guests, such as kids, we'll add them later! If you want to grant a plus-one to someone and don't know who it will be, just leave the name fields blank, but still fill out the rest.
                </label>
                <MaidOfHonor 
                  selectedCategory={selectedCategory} 
                  handleSelectChange={handleSelectChange}
                  categories={categories} 
                  rowsBridesmaids={rowsBridesmaids}
                  addRowBridesmaids={addRowBridesmaids}
                  handlePlusOneSelectChangeBridesmaids={handlePlusOneSelectChangeBridesmaids}
                  plusOneValueBridesmaids={plusOneValueBridesmaids}
                  handleRangeChangeBridesmaids={handleRangeChangeBridesmaids}
                  className='question-input' 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  required
                />
              </div>
            );
            case "Groomsmen":
            return (
              <div className='question-banner'>
                <label 
                  className='question-label-wedding-party' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <label 
                  className='question-label-instructions' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  For this section, let's just focus on the wedding party and their plus-one's. If there are other guests that you'd like to add along with these guests, such as kids, we'll add them later! If you want to grant a plus-one to someone and don't know who it will be, just leave the name fields blank, but still fill out the rest.
                </label>
                <Groomsmen 
                  selectedCategory={selectedCategory} 
                  handleSelectChange={handleSelectChange}
                  categories={categories} 
                  rowsGroomsmen={rowsGroomsmen}
                  addRowGroomsmen={addRowGroomsmen}
                  handlePlusOneSelectChangeGroomsmen={handlePlusOneSelectChangeGroomsmen}
                  plusOneValueGroomsmen={plusOneValueGroomsmen}
                  handleRangeChangeGroomsmen={handleRangeChangeGroomsmen}
                  className='question-input' 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  required
                />
              </div>
            );
          case "Everybody Else":
            return (
              <div className='question-banner'>
                <label 
                  className='question-label-wedding-party' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  {question.text}
                </label>
                <label 
                  className='question-label-instructions' 
                  style={{ backgroundColor: 'var(--secondary-color)'}}
                >
                  Now let's add everybody else! A best practice could be to go down your 'Category List', add and submit the corresponding guests, then start with the next category. Every time you submit guests, they should now appear in your guest list. Don't worry if you forget a few. We can always return to the questionnaire or add them in Guest List. 
                </label>
                <EverybodyElse
                  selectedCategory={selectedCategory} 
                  handleSelectChange={handleSelectChange}
                  categories={categories} 
                  className='question-input' 
                  type="text" 
                  value={answer} 
                  onChange={(e) => handleAnswer(question.id, e.target.value)} 
                  required
                />
              </div>
            );
          default:
            return null;
        }
      };
    
  return(
    <div className='questionnaire'>
        <Header />
            <Form className='questions'>
              <div className='question'>
                {renderQuestion(questions[currentPage])}
              </div>
              <div>
                {currentPage > 0 && (
                  <Button className="button" variant="primary" onClick={handlePrev}>Prev</Button>
                )}
                {currentPage < questions.length - 1 && (
                  <Button className="button" variant="primary" onClick={handleNext}>Next</Button>
                )}
                {currentPage === questions.length - 1 && (
                  <Button className="button" variant="primary" onClick={() => console.log(answers)}>Submit</Button>
                )} 
              </div>     
            </Form>
        <Footer />
    </div>
    )
  }

export default Questionnaire;
    
