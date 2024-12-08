import React, { useState } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import "./RegisterAndLogin.css";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


export default function Login(){
    const [formData, setFormData] = useState({
        phone_number: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/login/', formData);
            const { message, access_token, refresh_token } = response.data;
            setMessage(response.data.message);

            if (access_token && refresh_token) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            }
          
            navigate('/');

        } catch (error) {
            setMessage('Error: ' + JSON.stringify(error.response.data));
        }
    };


    return (
        <>
        <Header></Header>
        <div className="register-login-container">
            <h2 className='centered-text'>Вхід</h2>
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
                <br />
                <Link to = '/register'><span className='link-text'>Немає облікового запису ? Зареєструватися</span></Link>
                <br />

                <div className="checkbox-container">
                        <input type="checkbox" />
                        <span>Запам'ятати мене</span>
                </div>
            </form>
            <div className="register-login-button-container">
                <button type="submit" onClick={handleSubmit}>Увійти</button>
            </div>

            {message && <p>{message}</p>}

        </div>
        <Footer></Footer>
        </>
    );
}