import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import axiosConfig from "../../api/axiosConfig.js";
import "./Locations.css";
import React, { useState, useEffect } from "react";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const response = await axiosConfig.get("locations");
      console.log("Locations: ", locations);
      setLocations(response.data);
    };

    getLocations();
  }, []);

  return (
    <>
      <Header></Header>
      <div id="page-content">
        <h1 className="centered-text">Де нас знайти</h1>
        <h3>Наразі ми відкриті в наступних містах:</h3>
        <ul>
          {locations.map((location) => (
            <li>
              {location.city}, {location.address}
            </li>
          ))}
        </ul>

        <br />
        <div id="map-container">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1oARNIB0LKsLgXto-aIs9Lap1pevGRJI&ehbc=2E312F&noprof=1"
            width="100%"
            height="700px"
          ></iframe>
        </div>

        <p>
          <big>
            Будь ласка повідомте нас, якщо десь локація вказана не вірно.
            Контакту інформацію можна знайти у меню зверху.
          </big>
        </p>
      </div>
      <Footer></Footer>
    </>
  );
}
