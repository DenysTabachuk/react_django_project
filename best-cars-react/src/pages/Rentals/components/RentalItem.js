import axiosConfig from "../../../api/axiosConfig.js";

export default function RentalItem({ rentalObj, statusFilter }) {
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
      <img
        className="delete-rental-icon"
        src="/icons/bin.png"
        alt="delete rental"
        onClick={() => handleRentaDelete(rentalObj.id)}
      />

      <div className="rental-item">
        <img src={rentalObj.car.main_image_url} alt={rentalObj.car.name} />
        <div className="rent-info">
          <h2>{rentalObj.car.name}</h2>
          <p className="description">
            {new Date(rentalObj.start_date).toLocaleDateString("uk-UA")}-
            {new Date(rentalObj.end_date).toLocaleDateString("uk-UA")}
          </p>
          <p className="description">
            Днів оренди:{" "}
            {(
              (new Date(rentalObj.end_date) - new Date(rentalObj.start_date)) /
              (1000 * 3600 * 24)
            ).toFixed(0)}
          </p>
          <p className="description">
            {rentalObj.location.city}, {rentalObj.location.address}
          </p>
          <p>
            <b>{rentalObj.total_price}$</b>
          </p>
        </div>
        <div className="user-info">
          <h3>{rentalObj.user.email}</h3>
          <br />
          {rentalObj.user.phone_number && rentalObj.user.phone_number}
          <br />
          {rentalObj.user.first_name && rentalObj.user.first_name}{" "}
          {rentalObj.user.last_name && rentalObj.user.last_name}
        </div>
        {statusFilter === "pending" && (
          <div className="buttons-container">
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
    </div>
  );
}
