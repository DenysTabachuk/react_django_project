import axiosConfig from "../../../api/axiosConfig.js";
import React, { useState, useEffect } from "react";

export default function RentalItem({ rentalObj, statusFilter, screenWidth }) {
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = async () => {
    setShowComment(!showComment);
  };

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

  const handleRentaDelete = async (rentalId) => {
    try {
      const response = await axiosConfig.delete(`/rentals/${rentalId}/`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleteing rental:", error);
    }
  };

  return (
    <div className="rental-container">
      <div
        className="delelete-rental-icon-container"
        style={{
          padding: "10px 30px 10px 30px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <img
          className="delete-rental-icon"
          src="/icons/bin.png"
          alt="delete rental"
          onClick={() => handleRentaDelete(rentalObj.id)}
          style={{
            position: "relative",
            top: "60px",
            height: " 30px",
          }}
        />
      </div>

      <div
        className="rental-item"
        style={{
          border: "1px solid gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: screenWidth < 1400 ? "start" : "center",
          flexDirection: screenWidth < 1400 ? "column" : "row",
          gap: "15px",
          padding: "10px 30px 10px 30px",
        }}
      >
        <img
          src={rentalObj.car.main_image_url}
          alt={rentalObj.car.name}
          style={{
            width: screenWidth < 1400 && "100%",
          }}
        />

        <div
          className="rent-info"
          style={{
            width: screenWidth < 1400 && "100%",
            borderTop: screenWidth < 1400 && "1px solid gray",
          }}
        >
          <h2>{rentalObj.car.name}</h2>
          <p className="description">
            {new Date(rentalObj.start_date).toLocaleDateString("uk-UA")}-
            {new Date(rentalObj.end_date).toLocaleDateString("uk-UA")}
          </p>
          <p className="description">
            Днів оренди:{" "}
            {(
              (new Date(rentalObj.end_date) - new Date(rentalObj.start_date)) /
                (1000 * 3600 * 24) +
              1
            ).toFixed(0)}
          </p>
          <p className="description">
            {rentalObj.car.location.city}, {rentalObj.car.location.address}
          </p>
          <p>
            <b>{rentalObj.total_price}$</b>
          </p>
          {rentalObj.is_paid ? (
            <p className="green-text">Оплачено</p>
          ) : (
            <p className="red-text">Не оплачено</p>
          )}
        </div>

        <div
          className="additional-services"
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
            flexDirection: "column",
            aligItems: "flex-start",
            width: screenWidth < 1400 && "100%",
            borderTop: screenWidth < 1400 && "1px solid gray",
          }}
        >
          <h3>Додткові послуги</h3>
          {rentalObj.additional_services.length == 0 && (
            <p className="description">Додаткові послуги відсутні</p>
          )}
          {rentalObj.additional_services.map((service) => (
            <div
              className="service-price"
              style={{ display: "flex", gap: "8px" }}
            >
              <span className="description">{service.name}</span>-
              <span>{service.price}$</span>
            </div>
          ))}
        </div>

        <div
          className="user-info"
          style={{
            width: screenWidth < 1400 && "100%",
            borderTop: screenWidth < 1400 && "1px solid gray",
          }}
        >
          <h3>
            {rentalObj.user.first_name && rentalObj.user.first_name}{" "}
            {rentalObj.user.last_name && rentalObj.user.last_name}
          </h3>
          <p className="description">{rentalObj.user.email}</p>
          <p className="description">{rentalObj.phone_number}</p>
          <br />
        </div>

        {statusFilter === "pending" && (
          <div
            className="buttons-container"
            style={{
              width: screenWidth < 1400 && "100%",
              borderTop: screenWidth < 1400 && "1px solid gray",
            }}
          >
            <button
              className="default-button bg-green"
              onClick={() => handleRentalStatusChange("approved", rentalObj.id)}
            >
              Прийняти
            </button>
            <button
              className="default-button bg-red"
              onClick={() => handleRentalStatusChange("rejected", rentalObj.id)}
            >
              Відхилити
            </button>
          </div>
        )}
      </div>

      {rentalObj.comment && (
        <div>
          <div
            id="click-to-show-comment"
            onClick={handleShowComment}
            style={{
              backgroundColor: "gray",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 15px 10px 15px",
              boxSizing: "border-box",
            }}
          >
            <span>
              {showComment
                ? "Натисни щоб приховати коментар"
                : "Натисни щоб побачити коментар"}
            </span>
            <img
              src="icons/down-arrow.png"
              alt=""
              className={`icon down-arrow${showComment ? "-up" : ""}`}
            />
          </div>

          <div
            className={`comment ${showComment ? "fade-in" : "fade-out"}`}
            style={{
              padding: "15px",
              border: "1px solid gray",
              opacity: showComment ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              overflow: "hidden",
            }}
          >
            {rentalObj.comment}
          </div>
        </div>
      )}
    </div>
  );
}
