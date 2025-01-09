import React, { useState } from "react";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import "./RegisterAndLogin.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { validatePhoneNumber } from "../../validation/UserInfoValidation.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setPhoneErrorMessage("");

    if (formData.phone_number == "" || formData.password == "") {
      setMessage("Поля не можуть бути пустими");
      return;
    }

    if (!validatePhoneNumber(formData.phone_number)) {
      setPhoneErrorMessage("Невірний формат номера телефону");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login/",
        formData
      );
      const { message, access_token, refresh_token, is_admin } = response.data;
      setMessage(response.data.message);

      if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("is_admin", is_admin);
      }

      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors.length === 1 &&
        error.response.data.non_field_errors[0] === "Invalid credentials"
      ) {
        setMessage(
          "Користувача з таким номером та паролем не знайдено. Спробуйте ще раз."
        );
        return;
      }
      setMessage("Error: " + JSON.stringify(error.response.data));
    }
  };

  return (
    <>
      <Header></Header>
      <div className="register-login-container">
        <h2 className="centered-text">Вхід</h2>
        <form>
          <div className="input-container">
            <label>Номер телефону:</label>
            <br />
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <span className="error-text">
              {phoneErrorMessage != "" && phoneErrorMessage}
            </span>
          </div>

          <div className="input-container">
            <label>Пароль:</label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <div className="input-container">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <span>Показати пароль</span>
            </div>
          </div>

          <span className="error-text">{message && <p>{message}</p>}</span>

          <br />
          <Link to="/register">
            <span className="link-text">
              Немає облікового запису ? Зареєструватися
            </span>
          </Link>
          <br />

          <div className="checkbox-container">
            <input type="checkbox" />
            <span>Запам'ятати мене</span>
          </div>

          <div className="register-login-button-container">
            <button type="submit" onClick={handleSubmit}>
              Увійти
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
