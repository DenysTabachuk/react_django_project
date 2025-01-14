import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";

import "./UserProfile.css";

export default function UserProfile() {
  const [profile, setProfile] = useState({
    first_name: { value: "", label: "Ім'я", editing: false },
    last_name: { value: "", label: "Фамілія", editing: false },
    email: { value: "", label: "Email", editing: false },
    username: { value: "", label: "Логін", editing: false },
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [ongoingRentals, setOngoingRentals] = useState([]);
  const [completedRentals, setCompletedRentals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosConfig.get("users/user-profile/");
        const profileData = response.data;
        console.log("Profile data loaded successfully:", profileData);
        setProfile({
          first_name: {
            value: profileData.first_name,
            label: "Ім'я",
            editing: false,
          },
          last_name: {
            value: profileData.last_name,
            label: "Фамілія",
            editing: false,
          },
          email: { value: profileData.email, label: "Email", editing: false },
          phone_number: {
            value: profileData.phone_number,
            label: "Номер телефону",
            editing: false,
          },
        });

        const currentDate = new Date().toISOString();
        setOngoingRentals(
          profileData.rentals.filter((rental) => rental.end_date > currentDate)
        );
        setCompletedRentals(
          profileData.rentals.filter((rental) => rental.end_date <= currentDate)
        );
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    getProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_admin");
    navigate("/");
  };

  const handleEdit = async (key) => {
    let profileCopy = { ...profile };
    profileCopy[key].editing = !profileCopy[key].editing;
    setProfile(profileCopy);

    try {
      const response = await axiosConfig.patch("users/user-profile/", {
        email: profile.email.value,
        first_name: profile.first_name.value,
        last_name: profile.last_name.value,
      });

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile data", error);
    }
  };

  const handleProfileInfoChange = (event, key) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: {
        ...prevProfile[key],
        value: event.target.value,
      },
    }));
  };

  const handleKeyDown = (event, key) => {
    if (event.key === "Enter") {
      handleEdit(key);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleChangingPassword = () => {
    setChangingPassword(!changingPassword);
  };

  const handleSubmitPasswordChange = async () => {
    try {
      const response = await axiosConfig.patch("users/user-profile/", {
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      });

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile data", error);
    }
  };

  return (
    <>
      <Header />

      <div id="page-content">
        <h1>Профіль користувача: {profile.email.value || "Завантаження..."}</h1>

        <div id="profile-info-container">
          {Object.entries(profile).map(([key, { value, label, editing }]) => (
            <div className="profile-info-item" key={key}>
              <h3>{label} </h3>

              <div className="profile-info-button-container">
                {editing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(event) => handleProfileInfoChange(event, key)}
                    onKeyDown={(event) => handleKeyDown(event, key)}
                  />
                ) : (
                  <big>{value ? value : "Не вказано"}</big>
                )}

                <button
                  className="edit-add-profile-item-button"
                  onClick={() => handleEdit(key)}
                >
                  {editing ? "Зберегти" : value ? "Редагувати" : "Додати"}
                </button>
              </div>
            </div>
          ))}

          <>
            <div id="change-password-container">
              <div
                id="click-to-show-passwords"
                onClick={handleChangingPassword}
              >
                <span>
                  <small>
                    {changingPassword
                      ? "Натисни щоб приховати зміну пароля"
                      : "Натисни щоб змінити пароль"}
                  </small>
                </span>
                <img
                  src="icons/down-arrow.png"
                  alt=""
                  className={`icon down-arrow${changingPassword ? "-up" : ""}`}
                />
              </div>
              {changingPassword && (
                <div id="password-input-containers">
                  <div className="input-container">
                    <label>Cтарий Пароль:</label>
                    <br />
                    <input
                      // type={showPassword ? "text" : "password"}
                      type="text"
                      name="old_password"
                      value={passwords.old_password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="input-container">
                    <label>Новий Пароль:</label>
                    <br />
                    <input
                      // type={showPassword ? "text" : "password"}
                      type="text"
                      name="new_password"
                      value={passwords.new_password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div className="input-container">
                    <label>Повторити пароль:</label>
                    <br />
                    <input
                      // type={showPassword ? "text" : "password"}
                      type="text"
                      name="confirm_password"
                      value={passwords.confirm_password}
                      onChange={handlePasswordChange}
                    />
                    {/* <span className="error-text">
                    {passwordErrorMessage !== "" && passwordErrorMessage}
                  </span> */}

                    <button
                      className="default-button"
                      onClick={handleSubmitPasswordChange}
                    >
                      Змінити пароль
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
        <h1 className="centered-text">Оренди авто</h1>
        <h2>Поточні оренди авто</h2>
        <div className="profile-car-list">
          {ongoingRentals.length !== 0 ? (
            ongoingRentals.map((rental) => (
              <div className="profile-car-item" key={"rental" + rental.id}>
                <img src={rental.car.main_image_url} />
                <div className="rent-info">
                  <h2>{rental.car.name}</h2>
                  <p className="description">
                    {new Date(rental.start_date).toLocaleDateString("uk-UA")}-
                    {new Date(rental.end_date).toLocaleDateString("uk-UA")}
                  </p>
                  <p className="description">
                    Залишилося днів оренди:{" "}
                    {(
                      (new Date(rental.end_date) -
                        new Date(rental.start_date)) /
                      (1000 * 3600 * 24)
                    ).toFixed(0)}
                  </p>
                  <p>
                    <b>{rental.total_price}$</b>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="description">Немає поточних оренд</p>
          )}
        </div>

        <h2>Історія оренд</h2>
        <div className="profile-car-list">
          {completedRentals.length !== 0 ? (
            completedRentals.map((rental) => (
              <div className="profile-car-item" key={"rental" + rental.id}>
                <img src={rental.car.main_image_url} />
                <div className="rent-info">
                  <h2>{rental.car.name}</h2>
                  <p className="description">
                    {new Date(rental.start_date).toLocaleDateString("uk-UA")}-
                    {new Date(rental.end_date).toLocaleDateString("uk-UA")}
                  </p>
                  <p>
                    <b>{rental.total_price}$</b>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="description">Історія оренд відсутня</p>
          )}
        </div>

        <button id="logout-button" onClick={handleLogout}>
          Вийти з облікового запису
        </button>
      </div>

      <Footer></Footer>
    </>
  );
}
