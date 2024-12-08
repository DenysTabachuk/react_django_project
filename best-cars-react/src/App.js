import Home from './pages/Home/Home.js';
import CarRentRegistration from "./pages/CarRentRegistration/CarRentRegistration.js";
import CarInfo from "./pages/CarInfo/CarInfo.js";
import Register from './pages/RegisterAndLogin/Register.js';
import Login from './pages/RegisterAndLogin/Login.js';
import UserProfile from './pages/UserProfile/UserProfile.js';

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
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
