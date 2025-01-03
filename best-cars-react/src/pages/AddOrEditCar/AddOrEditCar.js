import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import React, { useState, useEffect  } from "react";
import {  useNavigate, useParams  } from 'react-router-dom'
import PriceTable from "./components/PriceTable.js"
import AddFunctions from "./components/AddFunctions.js";
import AddMainImage from "./components/AddMainImage.js";
import AddAdditionalImages from "./components/AddAdditionalImages.js";
import { convertToSnakeCase, convertToCamelCase } from "../../utils/index.js";
import "./AddOrEditCar.css";


const AddCarForm = () => {
  const isAdmin =  localStorage.getItem("is_admin");

  const navigate = useNavigate();
  const { id } = useParams(); 
  const [isEditing, setIsEditing] = useState(false);
  const [carData, setCarData] = useState({
    name: "",
    gearBox: "",
    fuelType: "",
    consumption: "",
    engineVolume: "",
    enginePower: "",
    mainImage: null,
    additionalImages: [],
    additionalFunctions: [],
    description: "",
    prices: [
      { range: "1-3", price: 0, editing: false },
      { range: "4-9", price: 0, editing: false },
      { range: "10-25", price: 0, editing: false },
      { range: "26+", price: 0, editing: false },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = convertToSnakeCase(carData);
    dataToSend.prices = dataToSend.prices.map(price => ({
      range: price.range,
      price: price.price,
    }));

    const formData = new FormData();
    Object.keys(dataToSend).forEach(key => {
      if  (key ===  "additional_images") {
        dataToSend.additional_images.forEach((image, index) => {
          formData.append(`additional_images[${index}]`, image);
        });
        // dataToSend.additional_images.forEach((image) => {
        //   formData.append("additional_images", image);  
        // });
      }
      else{
        const value = key === "additional_functions" || key === "prices" ? JSON.stringify(dataToSend[key]) : dataToSend[key] ;
        formData.append(key, value)
      }
    });

    fetch('http://localhost:8000/cars/', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.status === 201) { 
        navigate('/'); 
        window.location.reload();
      }
    })
    .then(data => {
      console.log("Response data: ", data);

    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
  

  useEffect(() => {
    if (id) {
      setIsEditing(true); 
      fetch(`http://localhost:8000/cars/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCarData(convertToCamelCase(data));
        })
        .catch((error) => console.error("Error fetching car data:", error));
    }
  }, [id]);

  

  return (
    <>
      <Header></Header>
      <div id="page-content">

      {isAdmin ? 
        <>
        <h1>Для створення оголошення необхідні права адміністратора.</h1>
        <p><big>Якщо ви впевнені, що у вас мають бути права адміністратора спробуйте перелогінитися на аккаунт.</big></p>
        </>
      :
        <>
          <h1 className="centered-text">Створення нового оголошення</h1>

          <form  onSubmit={handleSubmit}  id="add-new-car-form">
            <div id="column-container">
              <div id="column1">
                {/* car name */}
                <div className="input-container">
                  <label>Назва машини </label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={carData.name}
                    onChange={handleChange}
                  />
                </div>

                  {/* Gear Box Radio Buttons */}
                <div className="input-container">
                  <label>Коробка передач</label>
                  <br />
                  <input
                    type="radio"
                    name="gearBox" // Changed to match carData key
                    value="manual"
                    checked={carData.gearBox === "manual"}
                    onChange={handleChange}
                  />{" "}
                  Механічна
                  <input
                    type="radio"
                    name="gearBox" // Changed to match carData key
                    value="automatic"
                    checked={carData.gearBox === "automatic"}
                    onChange={handleChange}
                  />{" "}
                  Автомат
                </div>

                {/* Fuel Type Radio Buttons */}
                <div className="input-container">
                  <label>Тип пального</label>
                  <br />
                  <input
                    type="radio"
                    name="fuelType" // Fixed the name to match the state key
                    value="patrol"
                    checked={carData.fuelType === "patrol"}
                    onChange={handleChange}
                  />{" "}
                  Бензин
                  <input
                    type="radio"
                    name="fuelType" // Fixed the name to match the state key
                    value="diesel"
                    checked={carData.fuelType === "diesel"}
                    onChange={handleChange}
                  />{" "}
                  Дизель
                  <input
                    type="radio"
                    name="fuelType" // Fixed the name to match the state key
                    value="electricity"
                    checked={carData.fuelType === "electricity"}
                    onChange={handleChange}
                  />{" "}
                  Електроенергія
                </div>

                {/* Consumption */}
                <div className="input-container">
                  <label>Розхід</label>
                  <br />
                  <input
                    type="number"
                    step="0.1"
                    name="consumption"
                    value={carData.consumption}
                    onChange={handleChange}
                  />
                </div>

                {/* Engine Volume */}
                <div className="input-container">
                  <label>Об'м двигуна</label>
                  <br />
                  <input
                    type="number"
                    step="0.1"
                    name="engineVolume"
                    value={carData.engineVolume}
                    onChange={handleChange}
                  />
                </div>

                {/* Engine Power  */}
                <div className="input-container">
                  <label>Потужність двигуна</label>
                  <br />
                  <input
                    type="number"
                    name="enginePower"
                    value={carData.enginePower}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="input-container">
                  <label>Опис</label>
                  <br />
                  <textarea
                    name="description"
                    value={carData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div id="column2">
                <AddFunctions carDataObj={carData} setCarData={setCarData}></AddFunctions>
                <PriceTable  carDataObj={carData} setCarData={setCarData} ></PriceTable>
                <AddMainImage carDataObj={carData} setCarData={setCarData}></AddMainImage>
                <AddAdditionalImages carDataObj={carData} setCarData={setCarData}></AddAdditionalImages>
              </div>
            </div>


            <div id="add-car-button-container">
              <button id="add-edit-car-button" type="submit">
                { isEditing ? "Редагувати оголошення" : "Додати оголошення" }
              </button>
            </div>
          </form>
        </>
      }
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddCarForm;
