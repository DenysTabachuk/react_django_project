import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Header from "../../components/Header/Header.js";
import Select from "../../components/Seletect/Select.js";
import CarCard from "../../components/CarCard/CarCard.js";
import Search from "../../components/Search/Search.js";
import Footer from "../../components/Footer/Footer.js";
import axiosConfig from "../../api/axiosConfig.js";
import { convertToCamelCase } from "../../utils/index.js";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState(null);
  const [carBrands, setCarBrands] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    fuelType: "",
    carClass: "",
    gearBox: "",
    name: "",
  });
  const [selectedSortBy, setSelectedSortBy] = useState("");

  const sortBy = ["Ціна за зростанням", "Ціна за спаданням"];
  const fuelTypes = ["Бензин", "Електро", "Дизель", "Гібрид"];
  const carClasses = ["Економ", "Бізнес", "Середній"];
  const gearBoxTypes = ["Механічна", "Автоматична", "Напівавтоматична"];

  const fuelTypeMap = {
    Бензин: "petrol",
    Електро: "electric",
    Дизель: "diesel",
    Гібрид: "hybrid",
  };

  const carClassMap = {
    Бізнес: "buisness",
    Економ: "economy",
    Середній: "middle",
  };

  const gearBoxMap = {
    Механічна: "manual",
    Автоматична: "automatic",
    Напівавтоматична: "semi-automatic",
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosConfig.get("cars/brands");
        console.log("Brands:", response.data);

        setCarBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const filters = {
      fuel_type: selectedFilters.fuelType
        ? fuelTypeMap[selectedFilters.fuelType]
        : "",
      car_class:
        selectedFilters.carClass !== ""
          ? carClassMap[selectedFilters.carClass]
          : "",
      gear_box:
        selectedFilters.gearBox !== ""
          ? gearBoxMap[selectedFilters.gearBox]
          : "",
      brand: selectedFilters.brand,
      name: selectedFilters.name,
    };

    const fetchCars = async () => {
      try {
        const response = await axiosConfig.get("cars", { params: filters });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [selectedFilters]);

  const handleBrandChange = (value) => {
    setSelectedFilters({ ...selectedFilters, brand: value });
  };

  const handleFuelChange = (value) => {
    setSelectedFilters({
      ...selectedFilters,
      fuelType: value,
    });
  };

  const handleCarClass = (value) => {
    setSelectedFilters({ ...selectedFilters, carClass: value });
  };

  const handleGearBoxChange = (value) => {
    setSelectedFilters({ ...selectedFilters, gearBox: value });
  };

  const handleSortBy = (value) => {
    setSelectedSortBy(value);

    const sortedCars = [...cars].sort((a, b) => {
      if (value === "Ціна за зростанням") {
        return a.prices[0].price - b.prices[1].price; // За ціною по зростанню
      } else {
        return b.prices[0].price - a.prices[1].price; // За ціною по спаду
      }
    });
    console.log("sortedCars", sortedCars);

    setCars(sortedCars);
  };

  const handleNameChange = (value) => {
    setSelectedFilters({ ...selectedFilters, name: value });
  };

  return (
    <>
      <Header></Header>

      <div id="banner">
        <h1>Best Cars</h1>
        <p>
          <big>Оренда найкращих авто у вашому місті по доступній ціні</big>
        </p>
      </div>

      {carBrands !== null ? (
        <div id="page-content">
          <div id="filters">
            <div id="select-container">
              <Select
                values={carBrands.map((brand) => brand.name)}
                defaultValue={"Марка"}
                handleChange={handleBrandChange}
                selectedValue={selectedFilters.brand}
              ></Select>
              <Select
                values={fuelTypes}
                defaultValue={"Тип палива"}
                handleChange={handleFuelChange}
                selectedValue={selectedFilters.fuelType}
              ></Select>
              <Select
                values={carClasses}
                defaultValue={"Клас авто"}
                handleChange={handleCarClass}
                selectedValue={selectedFilters.carClass}
              ></Select>
              <Select
                values={gearBoxTypes}
                defaultValue={"Коробка передач"}
                handleChange={handleGearBoxChange}
                selectedValue={selectedFilters.gearBox}
              ></Select>
              <Select
                values={sortBy}
                defaultValue={"Сортувати за"}
                handleChange={handleSortBy}
                selectedValue={selectedSortBy}
              ></Select>{" "}
            </div>

            <Search handleSearchChange={handleNameChange}></Search>
          </div>

          {cars === null ? (
            <h2>Завантаження...</h2>
          ) : cars.length === 0 ? (
            <h2>Не знайдено доступних авто за даними фільтрами</h2>
          ) : (
            <div id="car-cards-container">
              {cars.map((car) => (
                <CarCard
                  carObject={car}
                  key={car.name}
                  customButton={
                    <button
                      className="rent-button"
                      onClick={() => navigate(`/cars/${car.id}`)}
                    >
                      Переглянути деталі
                    </button>
                  }
                ></CarCard>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1>Завантаження...</h1>
      )}

      <Footer></Footer>
    </>
  );
};

export default Home;
