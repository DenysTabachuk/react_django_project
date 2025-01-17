import React, { useState, useEffect } from "react";
import axiosConfig from "../../api/axiosConfig.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import RentalItem from "./components/RentalItem.js";
import "./Rentals.css";

export default function RentalConfirmation() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [pendingRentals, setPendingRentals] = useState([]);
  const [approvedRentals, setApprovedRentals] = useState([]);
  const [rejectedRentals, setRejectedRentals] = useState([]);

  const [statusFilter, setStatusFilter] = useState("pending");

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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <b>
            <big>Статус оренди:</big>
          </b>
        </label>
        <br />
        <select
          id="select-rental-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            width: screenWidth < 1400 ? "100%" : "25%",
          }}
        >
          <option value="pending">Очікують на підтвердження</option>
          <option value="approved">Підтверджено</option>
          <option value="rejected">Відхилено</option>
        </select>

        {rentalsToShow.length === 0 && <p>Немає оренд для цього статусу</p>}

        <div id="rentals-container">
          {rentalsToShow.map((rental) => (
            <div className="rental-container" key={"rental" + rental.id}>
              <RentalItem
                rentalObj={rental}
                statusFilter={statusFilter}
                screenWidth={screenWidth}
              ></RentalItem>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
