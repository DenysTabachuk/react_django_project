import "./CarRentRegistration.css";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import DatePicking from "./components/DatePicking.js";
import OrderSummary from "./components/OrderSummary.js";
import OptionServices from "./components/OptionServices.js";
import ContactInfo from "./components/ContactInfo.js";
import PaymentMethod from "./components/PaymentMethod.js";
import Select from "../../components/Select/Select.js";
import { optionalServices } from "./components/OptionServices.js"; // можливо дивно
import axiosConfig from "../../api/axiosConfig.js";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CarRentRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  let accessToken = localStorage.getItem("access_token");

  const [errorMessage, setErrorMessage] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [carInfo, setCarInfo] = useState(null);

  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState(
    []
  );
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [additionalComment, setAdditionalComment] = useState("");
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/users/user-profile/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const profileData = await response.json();
        console.log("Profile data", profileData);
        setUserInfo({
          id: profileData.id,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          phone_number: profileData.phone_number,
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
          console.log("Car data", data);
        } else {
          console.error("Car not found");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    const getLocations = async () => {
      const response = await axiosConfig.get("locations");
      console.log("Locations: ", locations);
      setLocations(response.data);
    };

    const fetchData = async () => {
      await Promise.all([getProfileData(), getCarData(), getLocations()]); // Чекаємо на обидва запити
      setLoadingData(false);
    };

    fetchData();
  }, []);

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdditionalOptionsChange = (e) => {
    const { name } = e.target;
    console.log("name", name);
    console.log("selectedAdditionalOptions", selectedAdditionalOptions);

    const selectedOption = {
      name: name,
      price: optionalServices[name].price,
    };
    setSelectedAdditionalOptions([
      ...selectedAdditionalOptions,
      selectedOption,
    ]);
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    console.log("Payment method", value);
    setPaymentMethod(value);
  };

  const handleAdditionalCommentChange = (e) => {
    const { value } = e.target;
    setAdditionalComment(value);
  };

  const handleConfirmRent = async () => {
    try {
      const rentalData = {
        user: userInfo.id,
        car: carInfo.id,
        start_date: dates.startDate,
        end_date: dates.endDate,
        additional_services: selectedAdditionalOptions,
        comment: additionalComment,
        payment_method: paymentMethod,
        location: selectedLocation,
      };

      if (dates.startDate === "" || dates.endDate === "") {
        return setErrorMessage("Виберіть коректні дати");
      }

      console.log("Rental data", rentalData);
      const response = await fetch(`http://localhost:8000/rentals/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rentalData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        console.error(errorData.errors);
      }
    } catch (error) {
      console.error("Error creating rent:", error);
    }
  };

  if (loadingData) {
    return <h1>Завантаження...</h1>;
  } else {
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
                values={optionalServices}
              ></OptionServices>

              {/* можливо це зараз зайве */}
              {/* <ContactInfo
                userInfo={userInfo}
                onChangeAction={handleContactInfoChange}
              ></ContactInfo> */}

              <PaymentMethod
                onChangeAction={handlePaymentMethodChange}
              ></PaymentMethod>

              <DatePicking
                onChangeAction={handleDateChange}
                dates={dates}
              ></DatePicking>
            </div>

            {/* 2 */}
            <div className="column column-space-between">
              <div id="comment-wrapper">
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

              <div id="location-wrapper">
                <h3>Локація</h3>
                <div id="location-selection">
                  <select
                    value={selectedLocation}
                    onChange={handleLocationChange}
                  >
                    <option value="" disabled>
                      Виберіть локацію
                    </option>

                    {locations.map((location) => (
                      <option value={location.id}>
                        {location.city}, {location.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <OrderSummary
                carInfo={carInfo}
                AditionalOptions={selectedAdditionalOptions}
                startDate={dates.startDate}
                endDate={dates.endDate}
              ></OrderSummary>
            </div>
          </div>

          <div id="error-message">
            <p className="centered-text error-text">{errorMessage}</p>
          </div>

          <div className="button-container">
            <button id="confirm-rent-button" onClick={handleConfirmRent}>
              Підтвердити бронювання
            </button>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}
