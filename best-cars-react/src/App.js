import Home from './pages/Home/Home.js';
import CarRentRegistration from "./pages/CarRentRegistration/CarRentRegistration.js";
import CarInfo from "./pages/CarInfo/CarInfo.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (  
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/car-rent" element={<CarRentRegistration />} />
          <Route exact path="/car-info" element={<CarInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
