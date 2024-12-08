import React, { useState } from 'react';
import "./RegisterAndLogin.css";
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log("submit");
        
        if (formData.password !== formData.confirmPassword) {
            setMessage('Паролі не співпадають');
        }
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/', formData);
            setMessage(response.data.message);
        } 
        catch (error) {
            setMessage('Error: ' + JSON.stringify(error.response.data));
        }
    };

    return (
        <>
        <Header></Header>
        <div className = "register-login-container">
            <h2 className='centered-text'>Реєстрація</h2>
            {/* onSubmit={handleSubmit} */}
            <form>
                <div className='input-container'>
                    <label>Номер телефону:</label>
                    <br />
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-container'>
                    <label>Пароль:</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className='input-container'>
                    <label>Повторити пароль:</label>
                    <br />
                    <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                </div>

                <Link to = '/login'><span className='link-text'>Вже зареєстровані ?</span></Link>
                <br />

                <div className="checkbox-container">
                    <input type="checkbox" />
                    <span>Надсилати мені цікаві пропозиції</span>
                </div>

                
                <div className="register-login-button-container">
                        <button type="submit" onClick={handleSubmit}>Зареєструватися</button>
                </div>
            </form>

            {message && <p>{message}</p>}
        </div>

        <Footer></Footer>
        </>
    );
};


