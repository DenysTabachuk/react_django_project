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
    phone_number: { value: "", label: "Номер телефону", editing: false },
    username: { value: "", label: "Логін", editing: false },
  });

  //To avoid unnecessary requests to the server
  const [originalProfile, setOriginalProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
  });

  const [rentals, setRentals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axiosConfig.get("users/user-profile/");
        const profileData = response.data;
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
          username: {
            value: profileData.username,
            label: "Логін",
            editing: false,
          },
        });

        setRentals(profileData.rentals);
        console.log("Profile data loaded successfully:", profileData);
        setOriginalProfile(profileData); // Зберігаємо оригінальні значення
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    getProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const handleEdit = async (key) => {
    let profileCopy = { ...profile };
    //toggle editing mode
    profileCopy[key].editing = !profileCopy[key].editing;
    setProfile(profileCopy);
    // if we stoped editing and we really changed field
    if (
      !profileCopy[key].editing &&
      originalProfile[key] != profileCopy[key].value
    ) {
      try {
        const response = await axiosConfig.patch("users/user-profile/", {
          username: profile.username.value,
          email: profile.email.value,
          phone_number: profile.phone_number.value,
          first_name: profile.first_name.value,
          last_name: profile.last_name.value,
        });

        console.log("Profile updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating profile data", error);
      }
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

  return (
    <>
      <Header />

      <div id="page-content">
        <h1>
          Профіль користувача: {profile.username.value || "Завантаження..."}
        </h1>

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
        </div>

        <a href="">Змінити пароль</a>

        <h2>Поточні аренди авто</h2>
        <div className="profile-car-list">
          {rentals.map(
            (rental) =>
              rental.end_date > new Date().toISOString() && (
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
              )
          )}
        </div>

        <h2>Історія оренд</h2>
        <div className="profile-car-list">
          {rentals.map(
            (rental) =>
              rental.end_date < new Date().toISOString() && (
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
              )
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
