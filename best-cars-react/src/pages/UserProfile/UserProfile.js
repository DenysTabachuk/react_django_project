import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../api/axiosConfig.js';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

import "./UserProfile.css"

export default function UserProfile() {
    const [profile, setProfile] = useState({
        first_name: { value: '', label: 'Ім\'я' },
        last_name: { value: '', label: 'Фамілія' },
        email: { value: '', label: 'Email' },
        phone_number: { value: '', label: 'Номер телефону' },
        username: { value: '', label: 'Логін' },
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
    }

    // Отримуємо дані профілю після завантаження компонента
    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await axiosConfig.get('users/user-profile/');
                const profileData = response.data;
                // Оновлюємо стан profile
                setProfile({
                    first_name: { value: profileData.first_name, label: 'Ім\'я' },
                    last_name: { value: profileData.last_name, label: 'Фамілія' },
                    email: { value: profileData.email, label: 'Email' },
                    phone_number: { value: profileData.phone_number, label: 'Номер телефону' },
                    username: { value: profileData.username, label: 'Логін' },
                });
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };

        getProfileData();
    }, []); // Викликається лише один раз при завантаженні компонента

    return (
        <>
            <Header />

            <div id="user-profile">
                <h1>Профіль користувача: {profile.username.value || 'Завантаження...'}</h1>

                <div id="profile-info-container">
                    {Object.entries(profile).map(([key, { value, label }]) => (
                        <div className="profile-info-item" key={key}>
                            <h3>{label} </h3> 

                            <div className="profile-info-button-container">
                                <big>{value ? value : 'Не вказано'}</big> 
                                <button className='edit-add-profile-item-button'>{value ? "Редагувати" : "Додати"}</button>
                            </div>
                        </div>
                    ))}
                </div>

                <a href="">Змінити пароль</a>

                <h2>Поточні аренди авто</h2>
                <div className="profile-car-list">
                    <div className="profile-car-item">
                        <img src="assets/volkswagen-jetta.webp" />
                         <div className="rent-info">
                            <h2>Volkswagen Jetta</h2>
                            <p className='description'>Ще 3 дні</p>
                             <p><b>500$</b></p>
                         </div>
                    </div>
                </div>

                <h2>Історія оренд</h2>
                <div className="profile-car-list">
                    <div className="profile-car-item">
                        <img src="assets/volkswagen-jetta.webp" />
                         <div className="rent-info">
                            <h2>Volkswagen Jetta</h2>
                            <p className='description'>10.11-2024 - 20.11.2024</p>
                             <p><b>500$</b></p>
                         </div>
                    </div>
                </div>


                <button id ="logout-button" onClick={handleLogout}>Вийти з облікового запису</button>
            </div>

            <Footer></Footer>
        </>
    );
}
