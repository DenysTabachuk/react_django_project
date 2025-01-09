const paymetMethods = [
  {
    icon: "icons/credit-card.png",
    name: "Картою",
    value: "card",
    discount: 10,
  },
  {
    icon: "icons/car-rent-registration/money.png",
    name: "Готівкою",
    value: "cash",
    discount: 0,
  },
];

export default function PaymentMethod({ onChangeAction }) {
  return (
    <div id="payment-method-wrapper">
      <h3>Спосіб оплати</h3>
      <p className="description">При сплаті онлайн знижка</p>

      <div id="payment-methods-container">
        {paymetMethods.map((method, index) => (
          <div className="payment-method" key={method.name}>
            {
              <>
                <div className="payment-method-option">
                  <div className="radio-icon-name">
                    <input
                      type="radio"
                      id={"option" + index}
                      name="choice"
                      value={method.value}
                      onClick={onChangeAction}
                    ></input>
                    <img src={method.icon} alt="" className="icon" />
                    <label htmlFor={"option" + index}>{method.name}</label>
                  </div>

                  <div className="discount-container">
                    <span>
                      <b>
                        {method.discount === 0
                          ? "немає знижки"
                          : `${method.discount}%`}
                      </b>
                    </span>
                  </div>
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
