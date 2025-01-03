import Home from './pages/Home/Home.js';
import CarRentRegistration from "./pages/CarRentRegistration/CarRentRegistration.js";
import CarInfo from "./pages/CarInfo/CarInfo.js";
import Register from './pages/RegisterAndLogin/Register.js';
import Login from './pages/RegisterAndLogin/Login.js';
import UserProfile from './pages/UserProfile/UserProfile.js';
import AddOrEditCar from './pages/AddOrEditCar/AddOrEditCar.js';
import ContactInformation from './pages/ContactInformation/ContactInformtaion.js';
import TermsOfRent from './pages/TermsOfRent/TermsOfRent.js';
import AboutCompany from './pages/AboutCompany/AboutCompany.js';

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
          <Route exact path="/add-car" element={<AddOrEditCar />} />
          <Route exact path="/edit-car/:id" element={<AddOrEditCar />} />
          <Route path="/cars/:id" element={<CarInfo />} /> 
          <Route path="/contact-info" element={<ContactInformation />} /> 
          <Route path="/terms-of-rent" element={<TermsOfRent />} /> 
          <Route path="/about-company" element={<AboutCompany />} /> 



      </Routes>
    </Router>
  );
};

export default App;
