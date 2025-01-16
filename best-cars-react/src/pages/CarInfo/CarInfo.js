import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import CutsomSlider from "../../components/CustomSlider/CustomSlider.js";
import CarCard from "../../components/CarCard/CarCard.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { convertToCamelCase } from "../../utils/index.js";
import axiosConfig from "../../api/axiosConfig.js";
import "./CarInfo.css";

export default function CarInfo() {
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  const carClassMap = {
    buisness: "Бізнес",
    economy: "Економ",
    middle: "Середній",
  };

  const gearBoxMap = {
    manual: "Механічна",
    automatic: "Автоматична",
    "semi-automatic": "Напівавтоматична",
  };

  const fuelTypeMap = {
    petrol: "Бензин",
    diesel: "Дизель",
    electric: "Електричний",
    hybrid: "Гібрид",
  };

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axiosConfig.get(`cars/${id}/`, {
          headers: {
            Accept: "application/json",
          },
        });
        console.log("Car Data", response.data);
        setCar(response.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchCarData();
  }, [id]);

  const handleDelete = () => {
    axiosConfig
      .delete(`/cars/${id}/`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  const handleEdit = () => {
    navigate(`/edit-car/${id}`);
  };

  if (!car) return <div>Завантаження...</div>;

  return (
    <>
      <Header></Header>
      <div id="page-content">
        <div id="car-info-container">
          <div id="column1">
            <h1>Прокат {car.name}</h1>
            <p className="description">
              <big>{carClassMap[car.car_class]} клас</big>
            </p>

            {car.additional_images.length > 0 ? (
              <CutsomSlider>
                {car.additional_images.map((item, index) => {
                  return (
                    <img key={item.id} src={item.image} alt={item.alt_text} />
                  );
                })}
              </CutsomSlider>
            ) : (
              <img src="/images/no_image_available.png" alt="" width="100%" />
            )}

            <div id="main-characteristics-container">
              <ul>
                <li>
                  <img
                    src="/icons/car-info/gearbox.png"
                    className="icon"
                    alt=""
                  />
                  <big>{gearBoxMap[car.gear_box]}</big>
                </li>
                <li>
                  <img src="/icons/car-info/fuel.png" className="icon" alt="" />
                  <big>
                    {fuelTypeMap[car.fuel_type]}/{car.consumption}
                  </big>
                </li>
                <li>
                  <img
                    src="/icons/car-info/car-engine.png"
                    className="icon"
                    alt=""
                  />
                  <big>
                    {car.engine_volume} л {car.engine_power} к.с.
                  </big>
                </li>
              </ul>
            </div>

            <div id="location-wrapper">
              <h2>Локація</h2>
              <div id="location-container">
                <p className="description">
                  <big>
                    {car.location.city}, {car.location.address}
                  </big>
                </p>
              </div>
            </div>

            <div id="additional-functions-wrapper">
              <h2>Додаткові функції</h2>
              <div id="additional-functions-container">
                {car.additional_functions.length !== 0 ? (
                  <ul>
                    {car.additional_functions.map((func, index) => (
                      <li key={index}>
                        <img
                          src="/icons/check-mark.png"
                          alt=""
                          className="icon"
                        />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="description">Додаткові функції не вказані</p>
                )}
              </div>
            </div>

            <div id="description-wrapper">
              <h2>Опис</h2>
              <div id="description-container">
                <p className="description">
                  <big>
                    {car.description ? car.description : "Опис відсутній"}
                  </big>
                </p>
              </div>
            </div>
          </div>

          <div id="column2" style={{ height: "100%" }}>
            <CarCard
              carObject={car}
              customButton={
                <button
                  className="rent-button"
                  onClick={() => navigate(`/car-rent/${car.id}`)}
                >
                  Орендувати
                </button>
              }
            ></CarCard>

            {isAdmin && (
              <div id="ad-managment">
                <h2 className="centered-text">Управління оголошенням</h2>
                <div className="button-container">
                  <button id="delete-button" onClick={handleDelete}>
                    Видалити оголошення
                  </button>
                  <button id="edit-button" onClick={handleEdit}>
                    Редагувати оголошення
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
