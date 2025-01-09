export const optionalServices = {
  "Безлімітний пробіг": {
    icon: "/icons/car-rent-registration/infinity.png",
    price: 45,
  },
  "Страхування авто": {
    icon: "/icons/car-rent-registration/insurance.png",
    price: 100,
  },
  "Дитяче крісло": {
    icon: "/icons/car-rent-registration/baby-car-seat.png",
    price: 15,
  },
  "Власний водій": {
    icon: "/icons/car-rent-registration/driver.png",
    price: 100,
  },
  "Повний бак": {
    icon: "/icons/car-rent-registration/gas-station.png",
    price: 50,
  },
};

export default function OptionServices({ onChangeAction, values }) {
  return (
    <div id="option-services-wrapper">
      <h3>Додаткові послуги</h3>
      <p className="description">
        Додаткові опції для максимально комфортної подорожі
      </p>

      <div id="option-services-container">
        {Object.keys(values).map((name) => {
          const option = values[name]; // Отримуємо опцію за ім'ям
          return (
            <div className="option-service" key={name}>
              <div className="checkbox-icon-name">
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  onChange={onChangeAction}
                  value={values[name]}
                />

                <img className="icon" src={option.icon} alt={option.name} />
                <span>{name}</span>
              </div>

              <div className="service-price-container">
                <span>
                  <b>{option.price}$</b>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
