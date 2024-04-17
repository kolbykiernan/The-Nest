import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Link component
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './HomePage'; 
import Questionnaire from './Questionnaire';
import Guestlist from './Guestlist';
import Seatingchart from './seatingchart';
import axios from 'axios';

function App() {
  
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
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



  const [bridesmaidsData, setBridesmaidsData] = useState(() => {
    const storedData = localStorage.getItem('bridesmaidsData');
    return storedData
      ? JSON.parse(storedData)
      : Array.from({ length: 10 }, (_, index) => ({
          id: index,
          firstName: '',
          lastName: '',
          selectedCategory: '',
          plusOneSelected: '',
          plusOneFirstName: '',
          plusOneLastName: '',
          selectedRole: '',
          plusOneValue: 1,
        }));
  });

  const [groomsmenData, setGroomsmenData] = useState(() => {
    // Initialize groomsmenData from localStorage or with default values
    const storedData = localStorage.getItem('groomsmenData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
        id: index, // Unique identifier for each row
        firstName: '',
        lastName: '',
        selectedCategory: '',
        plusOneSelected: '',
        plusOneFirstName: '',
        plusOneLastName: '',
        selectedRole: '',
        plusOneValue: 1,
    }));
  });

  const [everybodyElseData, setEverybodyElseData] = useState(() => {
    // Initialize everybodyElseData from localStorage or with default values
    const storedData = localStorage.getItem('everybodyElseData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
      id: index, // Unique identifier for each row
      firstName: '',
      lastName: '',
      selectedCategory: '',
      brideGroomOrMutual: '',
      guestValue: 1,
      plusOneSelected: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      plusOneValue: 1,
    }))
});

  return (
    <Router>
          <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/questionnaire" 
            element={<Questionnaire 
                      categories={categories} 
                      fetchCategories={fetchCategories} 
                      bridesmaidsData={bridesmaidsData}
                      setBridesmaidsData={setBridesmaidsData}
                      groomsmenData={groomsmenData}
                      setGroomsmenData={setGroomsmenData}
                      everybodyElseData={everybodyElseData}
                      setEverybodyElseData={setEverybodyElseData}
                      answers={answers}
                      setAnswers={setAnswers}
                      submitted={submitted}
                      submitWeddingData={submitWeddingData}
                      />} />
          <Route 
            path="/guestlist" 
            element={<Guestlist 
                      categories={categories}
                      bridesmaidsData={bridesmaidsData}
                      setBridesmaidsData={setBridesmaidsData}
                      groomsmenData={groomsmenData}
                      setGroomsmenData={setGroomsmenData}
                      everybodyElseData={everybodyElseData}
                      setEverybodyElseData={setEverybodyElseData} 
                      answers={answers}
                    />} />
          <Route path="/seatingchart" element={<Seatingchart />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
        </div>
    </Router>
  );
}

export default App;