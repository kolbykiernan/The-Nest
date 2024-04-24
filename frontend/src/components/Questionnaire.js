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
import '../styles/questionnaire.css';


const Questionnaire = ({ categories, fetchCategories, bridesmaidsData, setBridesmaidsData, groomsmenData, setGroomsmenData, everybodyElseData, setEverybodyElseData}) => {


  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 0;
  });

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [questions, setQuestions] = useState([
      { id: 1, text: "Let's start with the lovebirds!", type: "brideGroom"},
      { id: 2, text: "Next we're going to categorize how you know your guests!", type: "categoryForm"},
      { id: 3, text: "Bridesmaids", type: "bridesmaids"},
      { id: 4, text: "Groomsmen", type: "Groomsmen"},
      { id: 5, text: "Everybody Else", type: "Everybody Else"},
    ]);

    const handlePrev = async () => {
      const nextIndex = currentPage - 1;
      setCurrentPage(nextIndex);
      if (nextIndex === 0) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND || ''}/api/weddingdata`);
          
          const data = response.data;
          return {
            brideSelection: response.data.brideSelection,
            groomSelection: response.data.groomSelection,
            brideFirstName: response.data.brideFirstName,
            brideLastName: response.data.brideLastName,
            groomFirstName: response.data.groomFirstName,
            groomLastName: response.data.groomLastName
          };
    
        } catch (error) {
          console.error('Error fetching wedding data:', error);
        }
      }
    };
  

  const [weddingDataErrorMessage, setWeddingDataErrorMessage] = useState(null)

  const handleNext = async () => {
    const nextIndex = currentPage + 1;

    if (currentPage === 0 && !submitted) {
      if (
        brideFirstName.trim() === '' ||
        brideLastName.trim() === '' ||
        groomFirstName.trim() === '' ||
        groomLastName.trim() === ''
      ) {
        setWeddingDataErrorMessage('Please fill out all fields');
        return; 
      } else {
      submitWeddingData();
      setSubmitted(true);
      setWeddingDataErrorMessage(null);
    }
  };
  setCurrentPage(nextIndex);
}
  
      const handleAnswer = (questionId, answer) => {
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [questionId]: answer
        }));
      }; 
    
    const [brideSelection, setBrideSelection] = useState('Bride');
    const [groomSelection, setGroomSelection] = useState('Groom');
    const [brideFirstName, setBrideFirstName] = useState('');
    const [brideLastName, setBrideLastName] = useState('');
    const [groomFirstName, setGroomFirstName] = useState('');
    const [groomLastName, setGroomLastName] = useState('');
    
    const saveToLocalStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
    

    const getFromLocalStorage = (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };

    useEffect(() => {
      const savedWeddingData = getFromLocalStorage('weddingData');
      if (savedWeddingData) {
        setBrideFirstName(savedWeddingData.brideFirstName);
        setBrideLastName(savedWeddingData.brideLastName);
        setBrideSelection(savedWeddingData.brideSelection);
        setGroomFirstName(savedWeddingData.groomFirstName);
        setGroomLastName(savedWeddingData.groomLastName);
        setGroomSelection(savedWeddingData.groomSelection);
      }
    }, []);
    
    
    const submitWeddingData = async () => {
      try {

        handleAnswer('brideFirstName', brideFirstName);
        handleAnswer('brideLastName', brideLastName);
        handleAnswer('brideSelection', brideSelection);
        handleAnswer('groomFirstName', groomFirstName);
        handleAnswer('groomLastName', groomLastName);
        handleAnswer('groomSelection', groomSelection);
    
        const formData = {
          brideFirstName: answers['brideFirstName'],
          brideLastName: answers['brideLastName'], 
          brideSelection: answers['brideSelection'], 
          groomFirstName: answers['groomFirstName'], 
          groomLastName: answers['groomLastName'], 
          groomSelection: answers['groomSelection']
        };
    
        const response = await axios.post(`${process.env.REACT_APP_BACKEND || ''}/api/weddingdata`, formData);
        console.log('Form submitted successfully:', response.data);
        setSubmitted(true);

        saveToLocalStorage('weddingData', formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    

    useEffect(() => {

      const fetchBrideData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND || ''}/api/weddingdata`);
          return response.data.brideFirstName;
        } catch (error) {
          console.error('Error fetching bride first name:', error);
        }
      };
    

      const fetchGroomData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND || ''}/api/weddingdata`);
          return response.data.groomFirstName;
        } catch (error) {
          console.error('Error fetching groom first name:', error);
        }
      };
    
      fetchBrideData();
      fetchGroomData();
    }, []);
    
    useEffect(() => {

      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        const bridesmaidsQuestion = updatedQuestions.find(q => q.id === 3);
        if (bridesmaidsQuestion) {
          bridesmaidsQuestion.text = `${brideFirstName}'s Wedding Party`;
        }
        return updatedQuestions;
      });
    }, [brideFirstName]);
    
    useEffect(() => {

      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        const groomsmenQuestion = updatedQuestions.find(q => q.id === 4);
        if (groomsmenQuestion) {
          groomsmenQuestion.text = `${groomFirstName}'s Wedding Party`;
        }
        return updatedQuestions;
      });
    }, [groomFirstName]);

  
      useEffect(() => {

        handleAnswer('brideFirstName', brideFirstName);
        handleAnswer('brideLastName', brideLastName);
        handleAnswer('brideSelection', brideSelection);
        handleAnswer('groomFirstName', groomFirstName);
        handleAnswer('groomLastName', groomLastName);
        handleAnswer('groomSelection', groomSelection);
      }, [brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection]);



    

   
    
    
   
    
    const submitBridesmaidsData = async (bridesmaidsData) => {
      try {
    const requests = bridesmaidsData.map(async (row) => {

      if (!row.firstName.trim()) {
        console.log('Skipping row', row.id, 'because firstName is empty');
        return null; 
      }

      const formData = {
        firstName: row.firstName,
        lastName: row.lastName,
        selectedCategory: row.selectedCategory,
        plusOneSelected: row.plusOneSelected,
        plusOneFirstName: row.plusOneFirstName,
        plusOneLastName: row.plusOneLastName,
        selectedRole: row.selectedRole,
        plusOneValue: row.plusOneValue
      };
      return axios.post(`${process.env.REACT_APP_BACKEND || ''}/api/bridesmaids`, formData);
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

      if (!row.firstName.trim()) {
        console.log('Skipping row', row.id, 'because firstName is empty');
        return null; 
      }

      const formData = {
        firstName: row.firstName,
        lastName: row.lastName,
        selectedCategory: row.selectedCategory,
        plusOneSelected: row.plusOneSelected,
        plusOneFirstName: row.plusOneFirstName,
        plusOneLastName: row.plusOneLastName,
        selectedRole: row.selectedRole,
        plusOneValue: row.plusOneValue
      };
      return axios.post(`${process.env.REACT_APP_BACKEND || ''}/api/groomsmen`, formData);
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

      if (!row.firstName.trim()) {
        console.log('Skipping row', row.id, 'because firstName is empty');
        return null; 
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
      };
      return axios.post(`${process.env.REACT_APP_BACKEND || ''}/api/everybodyelse`, formData);
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

    const [submitAllData, setSubmitAllData] = useState(false);
    const redirectToGuestList = () => {
      window.location.href = '/guestlist';
    };
    
    const handleSubmitAllData = async () => {
      try {
        if (!submitAllData) {
          const submitFunctions = [];
    
          if (bridesmaidsData.some(row => row.firstName.trim())) {
            submitFunctions.push(() => submitBridesmaidsData(bridesmaidsData));
          }
    
          if (groomsmenData.some(row => row.firstName.trim())) {
            submitFunctions.push(() => submitGroomsmenData(groomsmenData));
          }
    
          if (everybodyElseData.some(row => row.firstName.trim())) {
            submitFunctions.push(() => submitEverybodyElseData(everybodyElseData));
          }
    
          await Promise.all(submitFunctions.map(submitFunction => submitFunction()));
    
          setSubmitAllData(true);
          redirectToGuestList();
        } else {
          console.log('Data already submitted. Cannot submit again.');
        }
      } catch (error) {
        console.error('Error submitting all data:', error);
      }
    };
     
    

  const renderQuestion = (question) => {
    if (!question) return null;

    const answer = answers[question.id] || '';
    switch (question.type) {
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
              brideFirstName={brideFirstName}
              setBrideFirstName={setBrideFirstName}
              brideLastName={brideLastName}
              setBrideLastName={setBrideLastName}
              brideSelection={brideSelection}
              setBrideSelection={setBrideSelection}
              groomFirstName={groomFirstName}
              setGroomFirstName={setGroomFirstName}
              groomLastName={groomLastName}
              setGroomLastName={setGroomLastName}
              groomSelection={groomSelection}
              setGroomSelection={setGroomSelection}
              weddingDataErrorMessage={weddingDataErrorMessage}
              required
            />
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
            It's best if you're together for this part! Consider how both of you know all the people who will attend your wedding. On average, most people have between 4 to 6 categories that encompass the majority of their guests. These categories might be unique to one of you or mutual. For instance, let's say you and your partner both want to invite friends from high school, but you attended different high schools. You only need to fill out that category once because we'll later specify which partner they originated from or if they are mutual. This same approach could apply to categories like 'Family,' but we'll leave those decisions to you! Take a moment to think about this, as it will affect your seating arrangements. There may still be a few guests who don't fit into any category. For them, you can create a category called 'Extra' or 'Other.' After adding a category, you should see it appear when clicking the dropdown!            </p>
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
      
      case "bridesmaids":
        return (
          <div className='questionnaire-questions'>
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

              For this section, let's focus solely on the wedding party and their plus-ones. If you wish to add other guests, such as children, we'll address them later. If you want to grant a plus-one to someone but don't know who it will be, simply leave the name fields blank while still filling out the rest.            
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
          <div className='questionnaire-questions'>
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
            For this section, let's focus solely on the wedding party and their plus-ones. If you wish to add other guests, such as children, we'll address them later. If you want to grant a plus-one to someone but don't know who it will be, simply leave the name fields blank while still filling out the rest.            
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
          <div className='questionnaire-questions'>
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
                Now let's get start adding the rest of your guests! A best practice could be to go down your 'Category List' and add all of the guests that you would categorize under each list. Then, start with the next category. If your guests have young children or you forget a few, you can put them in their own row or we can add them in the next section.
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
                  <Button className="prev-next-button" variant="primary" onClick={handlePrev}>Prev</Button>
                )}
                {currentPage < questions.length - 1 && (
                  <Button className="prev-next-button" variant="primary" onClick={handleNext}>Next</Button>
                )}
                {currentPage === questions.length - 1 && (
                  <Button className="prev-next-button" variant="primary" onClick={handleSubmitAllData}>Submit</Button>
                )} 
              </div>     
            </div>
        <Footer />
    </div>
    )
  }

export default Questionnaire;
    