import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../default-views/header'
import Footer from '../default-views/Footer'
import CategoryForm from './Questions/CategoryForm';
import BrideGroom from './Questions/BrideGroom';
import Bridesmaids from './Questions/Bridesmaids';
import Groomsmen from './Questions/Groomsmen';
import EverybodyElse from './Questions/Everybody_Else';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/questionnaire.css';


const Questionnaire = ({categories, fetchCategories, bridesmaidsData, setBridesmaidsData, groomsmenData, setGroomsmenData, everybodyElseData, setEverybodyElseData}) => {

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 0;
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
      { id: 8, text: "Next we're going to categorize how you know your guests!", type: "categoryForm"},
      { id: 9, text: "Bridesmaids", type: "bridesmaids"},
      { id: 10, text: "Groomsmen", type: "Groomsmen"},
      { id: 11, text: "Everybody Else", type: "Everybody Else"},
 
    ]);
    
  

    const handlePrev = async () => {
      const nextIndex = currentPage - 1;
      setCurrentPage(nextIndex);

      if (questions[currentPage].id === 7) {
        if (submitted) {
          // If the form has already been submitted, perform a PUT request to update existing data
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
    
            const response = await axios.put('http://localhost:3000/api/', formData);
            console.log('Form updated successfully:', response.data);
          } catch (error) {
            console.error('Error updating form:', error);
          }
        } else {
          submitWeddingData();
        }
      } else if (questions[nextIndex].id === 7) {
        try {
          const response = await axios.get('http://localhost:3000/api/');
          setExistingData(response.data);
        } catch (error) {
          console.error('Error fetching existing data:', error);
        }
      }
    };

    const [submitted, setSubmitted] = useState(false);
    const [existingData, setExistingData] = useState(null);

    const handleNext = async () => {
      const nextIndex = currentPage + 1;
      setCurrentPage(nextIndex);
    
      if (questions[currentPage].id === 7) {
        if (submitted) {
          // If the form has already been submitted, perform a PUT request to update existing data
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
    
            const response = await axios.put('http://localhost:3000/api/', formData);
            console.log('Form updated successfully:', response.data);
          } catch (error) {
            console.error('Error updating form:', error);
          }
        } else {
          submitWeddingData();
        }
      } else if (questions[nextIndex].id === 7) {
        try {
          const response = await axios.get('http://localhost:3000/api/');
          setExistingData(response.data);
        } catch (error) {
          console.error('Error fetching existing data:', error);
        }
      }
    };

    const handleAnswer = (questionId, answer) => {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: answer
      }));
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
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
 
      }
    }
  
    const submitBridesmaidsData = async (bridesmaidsData) => {
      try {
        const requests = bridesmaidsData.map(async (row) => {
          if (!row.firstName.trim() && !row.selectedCategory.trim()) {
            console.log('Skipping row', row.id, 'because firstName is empty');
            return null; // Skip this row if firstName is empty
          }
          const formData = {
            firstName: row.firstName,
            lastName: row.lastName,
            selectedCategory: row.selectedCategory,
            plusOneSelectedBridesmaids: row.plusOneSelectedBridesmaids,
            plusOneFirstName: row.plusOneFirstName,
            plusOneLastName: row.plusOneLastName,
            selectedRole: row.selectedRole,
            plusOneValueBridesmaids: row.plusOneValueBridesmaids
          };
          return axios.post('http://localhost:3000/api/bridesmaids', formData);
        });
    
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
          if (response) {
            console.log('Bridesmaids data submitted successfully for row', bridesmaidsData[index].id, ':', response.data);
          }
        });
      } catch (error) {
        console.error('Error submitting bridesmaids data:', error);
      }
    };
  

    const submitGroomsmenData = async (groomsmenData) => {
      try {
        const requests = groomsmenData.map(async (row) => {
          if (!row.firstName.trim() && !row.selectedCategory.trim()) {
            console.log('Skipping row', row.id, 'because firstName is empty');
            return null; // Skip this row if firstName is empty
          }
          const formData = {
            firstName: row.firstName,
            lastName: row.lastName,
            selectedCategory: row.selectedCategory,
            plusOneSelectedGroomsmen: row.plusOneSelectedGroomsmen,
            plusOneFirstName: row.plusOneFirstName,
            plusOneLastName: row.plusOneLastName,
            selectedRole: row.selectedRole,
            plusOneValueGroomsmen: row.plusOneValueGroomsmen
          };
          return axios.post('http://localhost:3000/api/groomsmen', formData);
        });
    
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
          if (response) {
            console.log('Groomsmen data submitted successfully for row', groomsmenData[index].id, ':', response.data);
          }
        });
      } catch (error) {
        console.error('Error submitting groomsmen data:', error);
      }
    };
   
  
    
    const submitEverybodyElseData = async (everybodyElseData) => {
      try {
        const requests = everybodyElseData.map(async (row) => {
          if (!row.firstName.trim() && !row.selectedCategory.trim()) {
            console.log('Skipping row', row.id, 'because firstName is empty');
            return null; // Skip this row if firstName is empty
          }
          const formData = {
            firstName: row.firstName,
            lastName: row.lastName,
            selectedCategory: row.selectedCategory,
            brideGroomOrMutual: row.brideGroomOrMutual,
            guestValue: row.guestValue,
            plusOneSelected: row.plusOneSelected,
            plusOneFirstName: row.plusOneFirstName,
            plusOneLastName: row.plusOneLastName,
            plusOneValue: row.plusOneValue,
            otherGuests: row.otherGuests,
            addOnFirstName: row.addOnFirstName,
            addOnLastName: row.addOnLastName,
            addOnValue: row.addOnValue,
            moreGuests: row.moreGuests,
            howMany: row.howMany,
          };
          return axios.post('http://localhost:3000/api/everybodyelse', formData);
        });
    
        const responses = await Promise.all(requests);
        responses.forEach((response, index) => {
          if (response) {
            console.log('EverybodyElse data submitted successfully for row', everybodyElseData[index].id, ':', response.data);
          }
        });
      } catch (error) {
        console.error('Error submitting everybodyelse data:', error);
      }
    };

    // const redirectToGuestList = () => {
    //   window.location.href = '/guestlist';
    // };

    const handleSubmitAllData = () => {
      submitBridesmaidsData(bridesmaidsData); 
      submitGroomsmenData(groomsmenData);     
      submitEverybodyElseData(everybodyElseData);
      // redirectToGuestList();
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
            <p className='category-font'>
                  It's best if you are together for this portion! Think of how you both know all of the people that will come to your wedding. The average person has between 4 - 6 categories that the majority of their guests can fall into. Maybe they're unique to one of you or maybe they are mutual. For example: Let's say you and your partner both want to invite friends from high school, but you didn't go to the same high school. You only need to fill that category out once because we will be assigning which partner they originated from or if they are mutual later. Take a little time to consider these as this will influence your seating chart! There may still be a few that don't fit into any category. For those, you can leave the category blank, or create 'Other'.
            </p>
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
              categories={categories} 
              type="text" 
              value={answer} 
              onChange={(e) => handleAnswer(question.id, e.target.value)} 
              handleAnswer={handleAnswer}
              required
            />
          </div>
        );
      case "bridesmaids":
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
            <Bridesmaids
              categories={categories}
              className='question-input' 
              type="text" 
              value={answer} 
              onChange={(e) => handleAnswer(question.id, e.target.value)} 
              handleAnswer={handleAnswer}
     
              bridesmaidsData={bridesmaidsData}
                setBridesmaidsData={setBridesmaidsData}
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
              categories={categories} 
              className='question-input' 
              type="text" 
              value={answer} 
              onChange={(e) => handleAnswer(question.id, e.target.value)} 
              handleAnswer={handleAnswer}

               groomsmenData={groomsmenData}
                      setGroomsmenData={setGroomsmenData}
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
              Now let's add everybody else! A best practice could be to go down your 'Category List', add all of the guests that you would put in that list., then start with the next category. For now, you can only hit submit once, so give it your best guess! Don't worry if you forget a few. We can add them in Guest List. 
            </label>
            <EverybodyElse
              categories={categories} 
              className='question-input' 
              type="text" 
              value={answer} 
              onChange={(e) => handleAnswer(question.id, e.target.value)} 
              handleAnswer={handleAnswer}

               everybodyElseData={everybodyElseData}
                      setEverybodyElseData={setEverybodyElseData}
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
            <div className='questions'>
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
                  <Button className="button" variant="primary" onClick={handleSubmitAllData}>Submit</Button>
                )} 
              </div>     
            </div>
        <Footer />
    </div>
    )
  }

export default Questionnaire;
    