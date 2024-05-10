import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './default-views/HomePage';
import Questionnaire from './components/Questionnaire';
import Guestlist from './components/Guestlist';
import Seatingchart from './components/seatingchart';
import FAQ from './default-views/faq';
import AboutUs from './default-views/about_us';
import axios from 'axios';
import SignUpForm from './users/SignUpForm';
import LoginForm from './users/LoginForm';
import CurrentUserProvider from './contexts/CurrentUser';

const App = () => {
  
  const [categories, setCategories] = useState([]);
  
  
  const fetchCategories = async () => {
    try {

      const response = await axios.get(`https://welcome-to-the-nest.onrender.com/api/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

    const storedData = localStorage.getItem('groomsmenData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
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

  const [everybodyElseData, setEverybodyElseData] = useState(() => {

    const storedData = localStorage.getItem('everybodyElseData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
      id: index, 
      firstName: '',
      lastName: '',
      selectedCategory: '',
      brideGroomOrMutual: '',
      guestValue: 1,
      plusOneSelected: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      plusOneValue: 1,
    }));
  });

  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
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
                      />} />
            <Route path="/seatingchart" element={<Seatingchart />} />
            <Route path="/FAQ" element={<FAQ/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        </div>
      </CurrentUserProvider>
    </BrowserRouter>
  );
}

export default App;
