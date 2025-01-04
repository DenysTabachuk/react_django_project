import "./CarRentRegistration.css"
import Header from "../../components/Header/Header.js"
import Footer from "../../components/Footer/Footer.js"
import DatePicking from "./components/DatePicking.js";
import OrderSummary from "./components/OrderSummary.js";
import OptionServices from "./components/OptionServices.js";
import ContactInfo from "./components/ContactInfo.js";
import PaymentMethod from "./components/PaymentMethod.js";
import { optionsAndServices } from "./components/OptionServices.js"; // можливо дивно

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function CarRentRegistration(){
    const { id } = useParams();
    let accessToken = localStorage.getItem("access_token");
    const [loadingData, setLoadingData] = useState(true);

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
    const [dates, setDates] = useState({ startDate: '',  endDate: ''});

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDates((prevDates) => ({
          ...prevDates,
          [name]: value
        }));
      };

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
                console.log("Profile data", profileData);
                setUserInfo({
                    id : profileData.id,
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
    }

    const handleConfirmRent = async () => {
        try {
            const rentalData = {
                user: userInfo.id,
                car: carInfo.id,
                start_date: dates.startDate,
                end_date: dates.endDate,
            };
            
            console.log(rentalData);
            const response = await fetch(`http://localhost:8000/rentals/`,
                {   method: 'POST',
                    headers: 
                    {
                        'Authorization': `Bearer ${accessToken}`, 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(rentalData)
                }
            );


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


    if (loadingData) {
        return <h1>Завантаження...</h1>;
    }
    else{
        return (
            <>
                <Header></Header>
                
                <div id="page-content">
                    <h1 className="centered-text">Оформлення оренди авто</h1>
                    <div id="rent-registration-grid-container">
                        {/* 1 */}
                        <div className="column">
                            <OptionServices 
                                onChangeAction={handleAdditionalOptionsChange} 
                                values={selectedAdditionalOptions}>
                            </OptionServices>
        
                            <ContactInfo 
                                userInfo = {userInfo} 
                                onChangeAction={handleContactInfoChange}>
                            </ContactInfo>
        
                            <PaymentMethod 
                                onChangeAction={handlePaymentMethodChange}>
                            </PaymentMethod>
                        </div>
        
                        {/* 2 */}
                        <div className="column column-space-between">     
        
                            <DatePicking
                                onChangeAction = {handleDateChange}
                                dates={dates}
                            ></DatePicking>
        
                            <div id ="comment-wrapper"> 
                                <h3>Коментар</h3>
                                <textarea 
                                id="comments" 
                                name="comments" 
                                rows="4" 
                                onChange={handleAdditionalCommentChange}
                                placeholder="Напишіть ваш коментар тут..." 
                                value={additionalComment}
                                ></textarea>
                            </div>
        
                            <OrderSummary 
                                carInfo = {carInfo}
                            ></OrderSummary>
                        </div>
                    </div>

                    <div className="button-container">
                        <button 
                            id="confirm-rent-button"
                            onClick={handleConfirmRent}    
                        >Підтвердити бронювання</button>
                    </div>
                </div>
                <Footer></Footer>
            </>
        );
    }

}