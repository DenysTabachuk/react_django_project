import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import React, { useState, useRef  } from 'react';
import axios from 'axios';
import "./AddNewCar.css"


const AddCarForm = () => {
  const [carData, setCarData] = useState({
    name: '',
    gearBox: '',
    fuelType: '',
    consumption: '',
    engineVolume: '',
    enginePower: '',
    prices: '',
    mainImage: null,
    additionalFunctions: [],
    description: ''
  });

  const fileInputRef = useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value
    });
  };

  const handleAddMainImageClick = (e) => {

    fileInputRef.current.click();
  }

  const handleImageChange = (e) => {
    setCarData({
      ...carData,
      mainImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in carData) {
      if (carData[key] instanceof Array) {
        formData.append(key, JSON.stringify(carData[key]));
      } else {
        formData.append(key, carData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/add-car/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Car added successfully');
    } catch (error) {
      alert('Failed to add car');
    }
  };

  return (
    <>
    <Header></Header>
    <div id="add-new-car">
    <h1 className='centered-text'>Створення нового оголошення</h1>
    <form onSubmit={handleSubmit} id="add-new-car-form">

        <div id="column1">
            {/* car name */}
            <div className='input-container'>
                <label>Назва машини </label>
                <br />
                <input type="text" name="name" value={carData.name} onChange={handleChange} />
            </div>

            {/* gear box */}
            <div className='input-container'>
                <label> Коробка передач </label>
                <br />
                <input 
                    type="radio" 
                    name="gearBox" 
                    value="manual" 
                    checked={carData.gearBox === 'manual'} 
                    onChange={handleChange} 
                /> Механічна
                <input 
                    type="radio" 
                    name="gearBox" 
                    value="automatic" 
                    checked={carData.gearBox === 'automatic'} 
                    onChange={handleChange}
                /> Автомат
            </div>

            {/* Fuel Type */}
            <div className='input-container'>
                <label>Тип пального </label>
                <br />
                <input 
                    type="radio" 
                    name="fuelType" 
                    value="patrol" 
                    checked={carData.fuelType === 'patrol'} 
                    onChange={handleChange} 
                /> Бензин
                <input 
                    type="radio" 
                    name="fuelType" 
                    value="diesel" 
                    checked={carData.fuelType === 'diesel'} 
                    onChange={handleChange} 
                /> Дизель
                    <input 
                    type="radio" 
                    name="fuelType" 
                    value="electricity" 
                    checked={carData.fuelType === 'electricity'} 
                    onChange={handleChange} 
                /> Електроенергія
            </div>

            {/* Consumption */}
            <div className='input-container'>
                    <label>Розхід</label>
                    <br />
                    <input type="number" step="0.1" name="consumption" value={carData.consumption} onChange={handleChange} />
                </div>

            {/* Engine Volume */}
            <div className='input-container'>
                <label>Об'м двигуна</label>
                <br />
                <input type="number" step="0.1" name="engineVolume" value={carData.engineVolume} onChange={handleChange} />
            </div>

            {/* Engine Power  */}
            <div className='input-container'>
                <label>Потужність двигуна</label>
                <br />
                <input type="number" name="enginePower" value={carData.enginePower} onChange={handleChange} />
            </div>

            {/* Description */}
            <div className='input-container'>
                <label>Опис</label>
                <br />
                <textarea name="description" value={carData.description} onChange={handleChange}></textarea>
            </div>
        </div>

        <div id="column2">
            {carData.mainImage && <img src={ URL.createObjectURL(carData.mainImage)} ></img>}
            <div className='input-container'>
                <label>Основне фото авто</label>
                <br />
                <img id="plus-image" src="images/plus.jpg" alt="plus immage" onClick={handleAddMainImageClick} />
                <input 
                id='input-main-photo'
                type="file" 
                name="mainImage" 
                onChange={handleImageChange}
                ref={fileInputRef}   />
            </div>

        </div>


    </form>
    <button type="submit">Add Car</button>
    </div>
  
    <Footer></Footer>
    </>
    
  );
};

export default AddCarForm;
