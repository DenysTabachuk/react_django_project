import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import CutsomSlider from "../../components/CustomSlider/CustomSlider.js";
import CarCard from "../../components/CarCard/CarCard.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { convertToCamelCase } from "../../utils/index.js";
import "./CarInfo.css";

export default function CarInfo() {
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/cars/${id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Card Data", data);
        setCar(convertToCamelCase(data));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/cars/${id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
      <div id="car-info-container">
        <div id="column1">
          <h1>Прокат {car.name}</h1>

          <CutsomSlider>
            {car.additionalImages.map((item, index) => {
              return <img key={item.id} src={item.image} alt={item.alt_text} />;
            })}
          </CutsomSlider>

          <div id="main-characteristics-container">
            <ul>
              <li>
                <img
                  src="/icons/car-info/gearbox.png"
                  className="icon"
                  alt=""
                />
                <big>{car.gearBox}</big>
              </li>
              <li>
                <img src="/icons/car-info/fuel.png" className="icon" alt="" />
                <big>
                  {car.fuelType}/{car.consumption}
                </big>
              </li>
              <li>
                <img
                  src="/icons/car-info/car-engine.png"
                  className="icon"
                  alt=""
                />
                <big>
                  {car.engineVolume} л {car.enginePower} к.с.
                </big>
              </li>
            </ul>
          </div>

          <div id="additional-functions-wrapper">
            <h2>Додаткові функції</h2>
            <div id="additional-functions-container">
              <ul>
                {car.additionalFunctions.map((func, index) => (
                  <li key={index}>
                    <img src="/icons/check-mark.png" alt="" className="icon" />
                    <span>{func}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="description-continaer">
            <h2>Опис</h2>
            <p>
              <big>{car.description}</big>
            </p>
          </div>
        </div>

        <div id="column2" style={{ height: "100%" }}>
          <div style={{ height: "30%", width: "70%", margin: "80px" }}>
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
          </div>

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

      <Footer></Footer>
    </>
  );
}
