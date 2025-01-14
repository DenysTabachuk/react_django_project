import React, { useState, useEffect } from "react";
import axiosConfig from "../../api/axiosConfig.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import "./Rentals.css";

export default function RentalConfirmation() {
  const [pendingRentals, setPendingRentals] = useState([]);
  const [approvedRentals, setApprovedRentals] = useState([]);
  const [rejectedRentals, setRejectedRentals] = useState([]);

  const [statusFilter, setStatusFilter] = useState("pending"); // Статус фільтру

  useEffect(() => {
    const getRentals = async () => {
      const result = await axiosConfig.get("rentals");
      // Розділяємо оренди за статусом
      const pending = result.data.filter(
        (rental) => rental.approval_status === "pending"
      );
      const approved = result.data.filter(
        (rental) => rental.approval_status === "approved"
      );
      const rejected = result.data.filter(
        (rental) => rental.approval_status === "rejected"
      );

      // Оновлюємо стани
      setPendingRentals(pending);
      setApprovedRentals(approved);
      setRejectedRentals(rejected);
    };

    getRentals();
  }, []); // Виконати один раз при завантаженні компонента

  const handleRentalStatusChange = async (newStatus, rentalId) => {
    try {
      const response = await axiosConfig.patch(
        `/rentals/${rentalId}/`,
        { approval_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(
        `Status of rental with id - ${rentalId} has changed successfully`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  // Визначаємо масив оренд для відображення згідно з фільтром
  let rentalsToShow = [];
  if (statusFilter === "pending") {
    rentalsToShow = pendingRentals;
  } else if (statusFilter === "approved") {
    rentalsToShow = approvedRentals;
  } else if (statusFilter === "rejected") {
    rentalsToShow = rejectedRentals;
  }

  return (
    <>
      <Header />

      <div id="page-content">
        <h1 className="centered-text">Оренди</h1>

        <label>
          <b>Статус оренди:</b>
        </label>
        <br />
        <select
          id="select-rental-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)} // Змінюємо статус фільтру
        >
          <option value="pending">Очікують на підтвердження</option>
          <option value="approved">Підтверджено</option>
          <option value="rejected">Відхилено</option>
        </select>

        {rentalsToShow.length === 0 && <p>Немає оренд для цього статусу</p>}

        <div id="rentals-container">
          {rentalsToShow.map((rental) => (
            <div className="rental-container" key={"rental" + rental.id}>
              <div className="profile-car-item">
                <img src={rental.car.main_image_url} alt={rental.car.name} />
                <div className="rent-info">
                  <h2>{rental.car.name}</h2>
                  <p className="description">
                    {new Date(rental.start_date).toLocaleDateString("uk-UA")}-
                    {new Date(rental.end_date).toLocaleDateString("uk-UA")}
                  </p>
                  <p className="description">
                    Днів оренди:{" "}
                    {(
                      (new Date(rental.end_date) -
                        new Date(rental.start_date)) /
                      (1000 * 3600 * 24)
                    ).toFixed(0)}
                  </p>
                  <p className="description">
                    {rental.location.city}, {rental.location.address}
                  </p>
                  <p>
                    <b>{rental.total_price}$</b>
                  </p>
                </div>
                <div className="user-info">
                  <h3>{rental.user.email}</h3>
                  <br />
                  {rental.user.phone_number && rental.user.phone_number}
                  <br />
                  {rental.user.first_name && rental.user.first_name}{" "}
                  {rental.user.last_name && rental.user.last_name}
                </div>
                {statusFilter === "pending" && (
                  <div className="buttons-container">
                    <button
                      className="default-button bg-green"
                      onClick={() =>
                        handleRentalStatusChange("approved", rental.id)
                      }
                    >
                      Прийняти
                    </button>
                    <button
                      className="default-button bg-red"
                      onClick={() =>
                        handleRentalStatusChange("rejected", rental.id)
                      }
                    >
                      Відхилити
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
