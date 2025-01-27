export default function OrderSummary({
  carInfo,
  AditionalOptions,
  startDate,
  endDate,
}) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  function calculateDaysBetweenDates(startDate, endDate) {
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1;
  }

  function calculatePriceForRentDays(rentDays) {
    let price = 0;
    if (rentDays < 4) {
      price = parseFloat(carInfo.prices[0].price) * rentDays;
    } else if (rentDays >= 4 && rentDays < 9) {
      price = parseFloat(carInfo.prices[1].price) * rentDays;
    } else if (rentDays >= 9 && rentDays < 26) {
      price = parseFloat(carInfo.prices[2].price) * rentDays;
    } else {
      price = parseFloat(carInfo.prices[3].price) * rentDays;
    }

    return price;
  }

  function calculatePriceForAdditionalOptions() {
    let price = 0;
    AditionalOptions.forEach((option) => {
      price += parseFloat(option.price);
    });

    return price;
  }

  let rentDays;
  let rentDaysPrice;
  let totalPrice;
  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
    rentDays = calculateDaysBetweenDates(start, end);
    rentDaysPrice = calculatePriceForRentDays(rentDays);

    // Apply discount if available
    if (carInfo.discount_percentage > 0) {
      rentDaysPrice -= (rentDaysPrice * carInfo.discount_percentage) / 100;
    }

    totalPrice = calculatePriceForAdditionalOptions() + rentDaysPrice;
  } else {
    rentDays = 0;
    totalPrice = 0;
    rentDaysPrice = 0;
  }

  return (
    <div id="order-summary-wrapper">
      <h2>Результат</h2>
      <div id="order-summary-container">
        <div id="car-image-name-container">
          <img src={carInfo.main_image_url} alt="" />
          <h3> {carInfo.name} </h3>
        </div>

        <div id="option-price-container">
          {AditionalOptions.map((option) => (
            <div className="option-price" key={option.id}>
              <span>{option.name}</span>
              <span>
                <b>{parseFloat(option.price).toFixed(2)}$</b>
              </span>
            </div>
          ))}
          <div className="option-price">
            <span>Mercedes GLS x{rentDays} дн.</span>
            <span>
              <b>{rentDaysPrice.toFixed(2)}$</b>
            </span>
          </div>
          <div className="option-price">
            <h3>Всього</h3>
            <span>
              <b>{totalPrice.toFixed(2)}$</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
