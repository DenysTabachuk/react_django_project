import "./CarRentRegistration.css"
import Header from "../../components/Header/Header.js"
import Footer from "../../components/Footer/Footer.js"
import DatePicking from "./components/DatePicking.js";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const optionsAndServices = [ {
        icon : "/icons/car-rent-registration/infinity.png",
        name : "Безлімітний пробіг",
        price : 45
    },
    {
        icon : "/icons/car-rent-registration/insurance.png",
        name : "Страхування авто",
        price : 100
    },
    {
        icon : "/icons/car-rent-registration/baby-car-seat.png",
        name : "Дитяче крісло",
        price : 15
    },
    {
        icon : "/icons/car-rent-registration/driver.png",
        name : "Власний водій",
        price : 100
    },
    {
        icon : "/icons/car-rent-registration/gas-station.png",
        name : "Повний бак",
        price : 50
    }

]

const paymetMethods = [{
        icon: "icons/credit-card.png",
        name:"Картою",
        discount: 10
    },
    {
        icon: "icons/car-rent-registration/money.png",
        name: "Готівкою",
        discount: 0
    }
]


export default function CarRentRegistration(){
    const { id } = useParams();
    console.log("Id = ", id)
    let accessToken = localStorage.getItem("access_token");

    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    });

    const [carInfo, setCarInfo] = useState(null);

    const [selectedAdditionalOptions, setSelectedAdditionalOptions ] = useState(
        Object.fromEntries(
            optionsAndServices.map(option => [option.name, false])
        )
    );


    const [paymentMethod, setPaymentMethod] = useState();
    const [additionalComment, setAdditionalComment] = useState("");
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await fetch('http://localhost:8000/users/user-profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, 
                        'Content-Type': 'application/json'
                    }
                });
            
                const profileData = await response.json();
    
                setUserInfo({
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    email: profileData.email,
                    phone_number: profileData.phone_number
                });
    
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };

        const getCarData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/cars/${id}/`);
                if (response.ok) {
                    const data = await response.json();
                    setCarInfo(data); 
                } else {
                    console.error("Car not found");
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };
    
        const fetchData = async () => {
            await Promise.all([getProfileData(), getCarData()]);  // Чекаємо на обидва запити
            setLoadingData(false);  // Тільки після того, як все завантажиться
            console.log(carInfo);
        };

        fetchData();
    }, []); 


    const handleContactInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevData => ({
          ...prevData,
          [name]: value  
        }));
      };

    
    const handleAdditionalOptionsChange = (e) =>{
        const {name} = e.target;

        setSelectedAdditionalOptions({
            ...selectedAdditionalOptions,
            [name]: !selectedAdditionalOptions[name]
        }
        );
    }


    const handlePaymentMethodChange = (e) =>{
        const {value} = e.target;
        setPaymentMethod(value);
    }

    const handleAdditionalCommentChange = (e) =>{
        const {value} = e.target;
        setAdditionalComment(value);
        console.log(value);
    }


    if (loadingData) {
        return <p>Завантаження...</p>;
    }

    return (
        <>
            <Header></Header>
            
            <h1 className="centered-text">Оформлення оренди авто</h1>
            <div id="rent-registration-grid-container">
                
                {/* 1 */}
                <div className="column">
                    <div id="option-services-wrapper">
                        <h3>Додаткові послуги</h3>
                        <p className="description">Додаткові опції для максимально комфортної подорожі</p>

                        <div id="option-services-container">
                            {optionsAndServices.map(  (option) =>
                                <div className="option-service">
                                    <div className="checkbox-icon-name">
                                        <input type="checkbox"
                                         id={option.name} 
                                         name={option.name}
                                         onChange={handleAdditionalOptionsChange}
                                         value = {selectedAdditionalOptions[option.name]}
                                         />


                                        <img className = "icon" src={option.icon} alt={option.name} />
                                        <span>{option.name}</span>
                                    </div>

                                    <div className="service-price-container">
                                        <span><b>{option.price}$</b></span>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>
            
                    <div id="contact-info-wrapper">
                        <h3>Контактні дані</h3>

                        <div id="contanct-info-inputs">
                            <div className="label-input">
                                <label htmlFor="first_name">Ім'я:</label>
                                <br />
                                <input 
                                type="text" 
                                id="firtst_name" 
                                name="first_name" 
                                placeholder="Введіть ваше Ім'я"
                                value={userInfo.first_name}
                                onChange={handleContactInfoChange}
                                required/>
                            </div>

                            <div className="label-input">
                                <label htmlFor="last_name">Фамілія:</label>
                                <br />
                                <input 
                                type="text" 
                                id="last_name" 
                                name="last_name" 
                                placeholder="Введіть вашу фамілію" 
                                value={userInfo.last_name}
                                onChange={handleContactInfoChange}
                                required/>
                            </div>
                            
                            <div className="label-input">
                                <label htmlFor="phone_number">Телефон:</label>
                                <br />
                                <input 
                                type="tel" 
                                id="phone_number" 
                                name="phone_number" 
                                placeholder="+380123456789" 
                                pattern="\+380\d{9}" 
                                value={userInfo.phone_number}
                                onChange={handleContactInfoChange}
                                required/>
                            </div>

                            <div className="label-input">
                                <label htmlFor="email">Електронна адреса:</label>
                                <br />
                                <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="example@email.com" 
                                value={userInfo.email}
                                onChange={handleContactInfoChange}
                                required/>
                            </div>
                        </div>
                    </div>

                    <div id="payment-method-wrapper">
                        <h3>Спосіб оплати</h3>
                        <p className="description">При сплаті онлайн знижка</p>
                        
                        <div id="payment-methods-container">
                        { paymetMethods.map( (method, index) =>
                            <div className="payment-method">{
                                <>
                                <div className = "payment-method-option">
                                    <div className = "radio-icon-name">
                                        <input 
                                            type="radio" 
                                            id={"option" + index} 
                                            name="choice" 
                                            value={method.name}
                                            onClick={handlePaymentMethodChange}
                                            >
                                        </input>
                                        <img src={method.icon} alt="" className="icon" />
                                        <label htmlFor={"option" + index}>{method.name}</label>
                                    </div>

                                    <div className="discount-container">
                                        <span><b>
                                            {method.discount === 0 
                                                    ? "немає знижки" 
                                                    : `${method.discount}%`
                                            }</b>
                                        </span>
                                    </div>
                                </div>
                                </>}
                            </div> ) }
                        </div>
                     
                    </div>
                </div>

                {/* 2 */}
                <DatePicking></DatePicking>


                <div className="column column-space-between">     
                    <div id ="comment-wrapper"> 
                        <h3>Коментар</h3>
                        <textarea 
                        id="comments" 
                        name="comments" 
                        rows="4" 
                        onChange={handleAdditionalCommentChange}
                        placeholder="Напишіть ваш коментар тут..." 
                        // value={additionalComment}
                        ></textarea>
                    </div>

                    <div id="order-summary-wrapper">
                        <div id="car-image-name-container">
                            <img src={carInfo.main_image} alt="" />
                            <h3> { (carInfo.name)} </h3>
                        </div>

                        <div id="option-price-container">               
                            <div className="option-price">
                                <span>Повний бак</span>
                                <span><b>50$</b></span>
                            </div>

                            <div className="option-price">
                                <span>Дитяче крісло</span>
                                <span><b>15$</b></span>
                            </div>

                            <div className="option-price">
                                <span>Mercedes GLS x3 дні</span>
                                <span><b>300$</b></span>
                            </div>

                            <div className="option-price">
                                <h3>Всього</h3>
                                <span><b>600$</b></span>
                            </div>
                        </div>
                     
                        <div id="rent-button-container">
                            <button id="confirm-rent-button">Підтвердити бронювання</button>
                        </div>
                    </div>
                </div>
            </div>


            <Footer></Footer>
        </>
    );
}