import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Виконуємо GET запит до вашого API Django
    axios.get('http://localhost:8000/api/')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (  
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
