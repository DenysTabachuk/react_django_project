import { useState } from 'react';
import React from 'react';
import Header from '../components/Header/Header';
import Select from '../components/Select';
import CarCard from '../components/CarCard';

const Home = () => {


  const [selectedFilters, setSelectedFilters] = useState( {
    selectedCar : "",
    selectedFuel : "",
    carClass: ""
  })

  const carBrands = ["Toyota", "BMW", "Mercedes", "Honda", "Tesla"]; 
  const fuelTypes = ["Бензин", "Електро", "Дизель", "Гібрид"];
  const carClasses = ["Економ", "Бізнес", "Середній"];

  const cars = [ {
    name : "Mercedes GLS",
    prices : [390, 350, 325 ,250],
    additionalFunctions : [ "Датчик світла", "Задня камера", "Клімат-контроль", 
      "Круїз контроль", "Мультимедіа система з LCD-екрано", "Мультифункціональне кермо"],
    mainImage : "/assets/mercedes_gls.webp"
  },
  {
    name : "Mercedes GLS",
    prices : [390, 350, 325 ,250],
    additionalFunctions : [ "Датчик світла", "Задня камера", "Клімат-контроль", 
      "Круїз контроль", "Мультимедіа система з LCD-екрано", "Мультифункціональне кермо"],
    mainImage : "/assets/mercedes_gls.webp"
  }
  ]

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
        { cars.map( (car) => <CarCard carObject={car}></CarCard> )}

      </div>

    </>
  );
};

export default Home;
