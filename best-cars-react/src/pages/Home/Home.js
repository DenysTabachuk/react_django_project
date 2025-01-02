import { useState, useEffect } from 'react';
import React from 'react';
import Header from '../../components/Header/Header.js';
import Select from '../../components/CarCard/Select.js';
import CarCard from '../../components/CarCard/CarCard.js';
import Footer from '../../components/Footer/Footer.js';
import {convertToCamelCase} from "../../utils/index.js"

import "./Home.css"

const Home = () => {
  const [cars, setCars] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState( {
    selectedCar : "",
    selectedFuel : "",
    carClass: ""
  })

  const carBrands = ["Toyota", "BMW", "Mercedes", "Honda", "Tesla"]; 
  const fuelTypes = ["Бензин", "Електро", "Дизель", "Гібрид"];
  const carClasses = ["Економ", "Бізнес", "Середній"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cars/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        return response.json();
      })
      .then((data) => {
        let convertedCars = [];
        data.forEach((car) => {
          convertedCars =  [ ...convertedCars , convertToCamelCase(car)];
        });
        setCars(convertedCars)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCarChange = (event) => {
    const selectedFiltersCopy = { ...selectedFilters };
    setSelectedFilters(selectedFiltersCopy);
  };

  const handleFuelChange = (event) => {
    const selectedFiltersCopy = { ...selectedFilters };
    setSelectedFilters(selectedFiltersCopy.fuelTypes = event.target.value);
  };

  const handleCarClass = (event) => {
    const selectedFiltersCopy = { ...selectedFilters };
    setSelectedFilters(selectedFiltersCopy.carClass = event.target.value);
  }

  return (
    <>
    <Header></Header>

    <div id="banner">
      <h1>Best Cars</h1>
      <p><big>Оренда найкращих авто у вашому місті по доступній ціні</big></p>
    </div>

    <div id="filters">
      
      <Select 
      values={carBrands}
      selectedValue =  {selectedFilters.selectedCar === "" ? "Марка" : selectedFilters.selectedCar}
      handleChange = {handleCarChange
      }></Select>

     <Select 
      values={fuelTypes}
      selectedValue =  {selectedFilters.selectedFuel === "" ? "Тип палива" : selectedFilters.selectedFuel}
      handleChange = {handleFuelChange
      }></Select>

    <Select 
      values={carClasses}
      selectedValue =  {selectedFilters.carClass === "" ? "Клас авто" : selectedFilters.carClass}
      handleChange = {handleCarClass
      }></Select>
      
    </div>

    <div id="car-cards-container">
      { cars.map( (car) => <CarCard carObject={car} key={car.name}></CarCard> )}

    </div>

    <Footer></Footer>
    </>
  );
};

export default Home;
