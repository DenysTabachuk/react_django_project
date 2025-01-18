import "./CarCard.css";

export default function CarCard({ carObject, customButton }) {
  return (
    <div className="car-card">
      <h2>{carObject.name}</h2>
      <img src={carObject.main_image_url} alt={carObject.name + " photo"} />

      <div className="time-price-container">
        <div className="time-price">
          <span>
            <big>
              <b>Час оренди</b>
            </big>
          </span>
          <span>
            <big>
              <b>Ціна</b>
            </big>
          </span>
        </div>

        {carObject.prices.map((timePrice) => (
          <div className="time-price" key={timePrice.range + carObject.name}>
            <span>
              <big>{timePrice.range} дн.</big>
            </span>
            <span>
              {parseFloat(carObject.discount_percentage) != 0 && (
                <big style={{ textDecoration: "line-through" }}>
                  <b>
                    {timePrice.price}
                    {"$ "}
                  </b>
                </big>
              )}

              <big
                style={{
                  color:
                    parseFloat(carObject.discount_percentage) != 0 && "red",
                }}
              >
                <b>
                  {parseFloat(carObject.discount_percentage) !== 0
                    ? (
                        timePrice.price -
                        (timePrice.price * carObject.discount_percentage) / 100
                      ).toFixed(2)
                    : timePrice.price.toFixed(2)}
                  $
                </b>
              </big>
              <big> за добу</big>
            </span>
          </div>
        ))}
      </div>

      {customButton && (
        <div className="custom-button-container">{customButton}</div>
      )}
    </div>
  );
}
