import React, { useState } from "react";
import "./RegisterAndLogin.css";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import axiosConfig from "../../api/axiosConfig.js";

import { useNavigate, Link } from "react-router-dom";
import {
  validatePassword,
  validatePhoneNumber,
  validateEmail,
} from "../../validation/UserInfoValidation.js";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "", // Додано для імені
    last_name: "", // Додано для прізвища
  });

  const [emailConfirmation, setEmailConfiramtion] = useState(false);

  const [message, setMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState(""); // Додано для помилки імені

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setNameErrorMessage("");

    let formIsValid = true;
    if (!formData.first_name || !formData.last_name) {
      setNameErrorMessage("Ім'я та прізвище не можуть бути порожніми");
      formIsValid = false;
    }

    if (!validateEmail(formData.email)) {
      setEmailErrorMessage(
        "Будь ласка, введіть коректну електронну пошту у форматі example@domain.com."
      );
      formIsValid = false;
    }

    if (formData.email === "") {
      setEmailErrorMessage("Email не може бути порожнім");
      formIsValid = false;
    }

    if (!validatePassword(formData.password)) {
      setPasswordErrorMessage(
        "Пароль повинен містити хоча б одну велику літеру і одну цифру, мінімум 6 символів"
      );
      formIsValid = false;
    }
    if (formData.password !== formData.confirm_password) {
      setPasswordErrorMessage("Паролі не співпадають");
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    try {
      const response = await axiosConfig.post("users/register/", formData);
      setMessage(response.data.message);
      if (response.status === 201) {
        setEmailConfiramtion(true);
      }
    } catch (error) {
      setEmailErrorMessage(error.response.data.email[0]);
    }
  };

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.put("users/register/", {
        email: formData.email,
        code: formData.verification_code,
      });
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.non_field_errors);
    }
  };

  return (
    <>
      <Header></Header>
      {emailConfirmation ? (
        <div id="page-content">
          <h1 className="centered-text">Підтвердіть що це ваш email</h1>
          <p className="centered-text">
            На ваш email було надіслано 4-значний код, введіть його нижче, щоб
            підвердити електронну адресу
          </p>

          <div id="verifiaction-code-input-container">
            <label>Код підтвердження:</label>
            <br />

            <input
              type="text"
              name="verification_code"
              value={formData.verification_code}
              onChange={handleChange}
              maxLength="4" // Обмеження на 4 символи
              pattern="\d{4}" // Перевірка, щоб це були лише цифри
              title="Код має складатися з 4 цифр"
            />
            <span className="error-text">{message !== "" && message}</span>

            <button className="default-button" onClick={handleConfirmEmail}>
              Підтвердити
            </button>
          </div>
        </div>
      ) : (
        <div className="register-login-container">
          <h2 className="centered-text">Реєстрація</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Ім'я:</label>
              <br />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <br />
              <span className="error-text">{nameErrorMessage}</span>
            </div>

            <div className="input-container">
              <label>Прізвище:</label>
              <br />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <br />
              <span className="error-text">{nameErrorMessage}</span>
            </div>

            <div className="input-container">
              <label>Email:</label>
              <br />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <br />
              <span className="error-text">
                {emailErrorMessage !== "" && emailErrorMessage}
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
              <label>Повторити пароль:</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
              <span className="error-text">
                {passwordErrorMessage !== "" && passwordErrorMessage}
              </span>
            </div>

            <div className="input-container">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <span>Показати пароль</span>
            </div>

            <div>
              <br />
              <Link to="/login">
                <span className="link-text">Вже зареєстровані ?</span>
              </Link>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" />
              <span>Надсилати мені цікаві пропозиції</span>
            </div>

            <div className="register-login-button-container">
              <button type="submit">Зареєструватися</button>
            </div>
          </form>

          <span className="error-text">{message && <p>{message}</p>}</span>
        </div>
      )}

      <Footer></Footer>
    </>
  );
}
