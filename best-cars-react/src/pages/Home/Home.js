import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Header from "../../components/Header/Header.js";
import Select from "../../components/Select/Select.js";
import CarCard from "../../components/CarCard/CarCard.js";
import Search from "../../components/Search/Search.js";
import Footer from "../../components/Footer/Footer.js";
import axiosConfig from "../../api/axiosConfig.js";
import { convertToCamelCase } from "../../utils/index.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(window.innerWidth > 1024);
  const [moveSearch, setMoveSearch] = useState(window.innerWidth <= 1440);
  const [cars, setCars] = useState(null);
  const [carBrands, setCarBrands] = useState(null);
  const [locations, setLocations] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    fuelType: "",
    carClass: "",
    gearBox: "",
    name: "",
    location: "",
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
    const handleResize = () => {
      setShowFilters(window.innerWidth > 1024);
      setMoveSearch(window.innerWidth <= 1440);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    const getLocations = async () => {
      const response = await axiosConfig.get("locations");
      console.log("Locations: ", locations);
      setLocations(response.data);
    };

    getLocations();
    fetchBrands();
  }, []);

  useEffect(() => {
    const locationObject = locations.find(
      (item) =>
        `${item.city},${item.address}`.trim() ===
        selectedFilters.location.trim()
    );

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
      location: locationObject != null ? locationObject.id : "",
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

  const handleFilterChange = (field, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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

  const [text, setText] = useState("Натисни щоб побачити фільтри"); // test

  const handleClickToShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <Header></Header>

      <div id="banner">
        <h1>Best Cars</h1>
        <p className="centered-text">
          <big>Оренда найкращих авто у вашому місті по доступній ціні</big>
        </p>
      </div>

      <div id="click-to-show-filters" onClick={handleClickToShowFilters}>
        <span>
          <big>
            {showFilters
              ? "Натисни щоб приховати фільтри"
              : "Натисни щоб побачити фільтри"}
          </big>
        </span>
        <img
          src="icons/down-arrow.png"
          alt=""
          className={`icon down-arrow${showFilters ? "-up" : ""}`}
        />
      </div>

      {carBrands !== null ? (
        <div id="page-content">
          <div
            id="filters"
            style={{
              // display: !showFilters ? "none" : moveSearch ? "flex" : "block",
              // display: moveSearch ? "flex" : "block",
              display: "flex",
              flexDirection: moveSearch ? "column" : "row",
              alignItems: moveSearch ? "start" : undefined,
              gap: "20px",
            }}
          >
            <div id="select-container">
              <Select
                name="brand"
                values={carBrands.map((brand) => brand.name)}
                defaultValue={"Марка"}
                handleChange={handleFilterChange}
                selectedValue={selectedFilters.brand}
              ></Select>
              <Select
                name="fuelType"
                values={fuelTypes}
                defaultValue={"Тип палива"}
                handleChange={handleFilterChange}
                selectedValue={selectedFilters.fuelType}
              ></Select>
              <Select
                name="carClass"
                values={carClasses}
                defaultValue={"Клас авто"}
                handleChange={handleFilterChange}
                selectedValue={selectedFilters.carClass}
              ></Select>
              <Select
                name="gearBox"
                values={gearBoxTypes}
                defaultValue={"Коробка передач"}
                handleChange={handleFilterChange}
                selectedValue={selectedFilters.gearBox}
              ></Select>
              <Select
                name="location"
                values={locations.map(
                  (location) => location.city + "," + location.address
                )}
                defaultValue={"Локація"}
                handleChange={handleFilterChange}
                selectedValue={selectedFilters.location}
              ></Select>
              <Select
                values={sortBy}
                defaultValue={"Сортувати за"}
                handleChange={handleFilterChange}
                selectedValue={selectedSortBy}
              ></Select>{" "}
            </div>

            <Search handleSearchChange={handleFilterChange}></Search>
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
                  key={car.id}
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
