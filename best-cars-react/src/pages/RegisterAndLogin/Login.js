import React, { useState } from "react";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import "./RegisterAndLogin.css";
import axiosConfig from "../../api/axiosConfig.js";
import { useNavigate, Link } from "react-router-dom";
import { validatePhoneNumber } from "../../validation/UserInfoValidation.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
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
    setEmailErrorMessage("");

    if (formData.email == "" || formData.password == "") {
      setMessage("Поля не можуть бути пустими");
      return;
    }

    try {
      const response = await axiosConfig.post("users/login/", formData);
      const { message, access_token, refresh_token, is_admin } = response.data;
      setMessage(response.data.message);

      if (access_token && refresh_token) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("is_admin", is_admin);
      }

      navigate("/");
    } catch (error) {
      console.log("error.response.data", error.response.data);
      if (
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors.length === 1 &&
        error.response.data.non_field_errors[0] === "Invalid credentials"
      ) {
        setMessage(
          "Користувача з такою електронною адресою та паролем не знайдено. Спробуйте ще раз."
        );
        return;
      }
      setMessage("Не вдалося авторизуватися.");
    }
  };

  return (
    <>
      <Header></Header>
      <div className="register-login-container">
        <h2 className="centered-text">Вхід</h2>
        <form>
          <div className="input-container">
            <label>Email:</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="error-text">
              {emailErrorMessage && emailErrorMessage}
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
