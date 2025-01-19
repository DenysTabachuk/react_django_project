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
  const [filtersReady, setFiltersReady] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    fuelType: "",
    carClass: "",
    gearBox: "",
    name: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const [selectedSortBy, setSelectedSortBy] = useState("");

  const sortBy = ["Ціна за зростанням", "Ціна за спаданням"];
  const fuelTypes = ["Бензин", "Електро", "Дизель"];
  const carClasses = ["Економ", "Бізнес", "Середній"];
  const gearBoxTypes = ["Механічна", "Автоматична", "Напівавтоматична"];

  const fuelTypeMap = {
    Бензин: "petrol",
    Електро: "electric",
    Дизель: "diesel",
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

  // handle screen resize
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
      try {
        const response = await axiosConfig.get("locations");
        console.log("Locations: ", locations);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    getLocations();
    fetchBrands();

    const storedFilters = getFiltersFromLocalStorage();
    console.log("Фільтри з localstorage", storedFilters);
    if (storedFilters) {
      setSelectedFilters(storedFilters);
    }
    setFiltersReady(true); // Фільтри завантажені
  }, []);

  useEffect(() => {
    saveFiltersToLocalStorage(selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    console.log("selectedFilters оновилися:", selectedFilters);
  }, [selectedFilters]);

  useEffect(() => {
    if (!filtersReady) {
      console.log("Очікуємо готовність фільтрів або локацій...");
      return;
    }

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
      start_date: selectedFilters.startDate,
      end_date: selectedFilters.endDate,
    };

    console.log("Фіотри при пошуку:", filters);

    const fetchCars = async () => {
      try {
        const response = await axiosConfig.get("cars", { params: filters });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [selectedFilters, filtersReady]);

  const handleFilterChange = (field, value) => {
    console.log(field, value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleSortBy = (value) => {
    console.log(value);
    setSelectedSortBy(value);

    const sortedCars = [...cars].sort((a, b) => {
      const basePriceA = a.prices[0].price;
      const basePriceB = b.prices[0].price;

      const discountA = a.discount_percentage || 0;
      const discountB = b.discount_percentage || 0;

      const finalPriceA = basePriceA * (1 - discountA / 100);
      const finalPriceB = basePriceB * (1 - discountB / 100);

      if (value === "Ціна за зростанням") {
        return finalPriceA - finalPriceB;
      } else {
        return finalPriceB - finalPriceA;
      }
    });

    setCars(sortedCars);
  };

  const handleClickToShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const saveFiltersToLocalStorage = (filters) => {
    localStorage.setItem("carFilters", JSON.stringify(filters));
  };

  const getFiltersFromLocalStorage = () => {
    const filters = localStorage.getItem("carFilters");
    return filters ? JSON.parse(filters) : null;
  };

  return (
    <>
      <Header></Header>

      <div id="banner">
        <h1>Best Cars</h1>
        <p className="centered-text">
          <big>Оренда найкращих авто у вашому місті по доступній ціні</big>
        </p>

        <div
          id="select-dates"
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "15px",
            marginTop: "30px",
          }}
        >
          <p
            style={{
              color: "black",
            }}
            className="centered-text"
          >
            <h2>Оберіть дати</h2>
          </p>

          <div
            id="date-select-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%" }}>
              <label
                htmlFor="start-date"
                style={{ color: "black", marginLeft: "10px" }}
              >
                <b>
                  <big>Дата початку:</big>
                </b>
              </label>
              <input
                style={{ padding: "10px", width: "80%" }}
                type="date"
                id="start-date"
                value={selectedFilters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                min={today}
                max={selectedFilters.endDate}
              />
            </div>

            <div style={{ width: "50%" }}>
              <label
                htmlFor="end-date"
                style={{ color: "black", marginLeft: "10px" }}
              >
                <b>
                  <big>Дата кінця:</big>
                </b>
              </label>
              <input
                style={{ padding: "10px", width: "85%" }}
                type="date"
                id="end-date"
                value={selectedFilters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                min={selectedFilters.startDate || today}
              />
            </div>
          </div>
        </div>
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
              display: !showFilters ? "none" : "flex",
              // display: moveSearch ? "flex" : "block",
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
                handleChange={handleSortBy}
                selectedValue={selectedSortBy}
              ></Select>{" "}
            </div>

            <Search
              handleSearchChange={handleFilterChange}
              text={selectedFilters.name}
            ></Search>
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
