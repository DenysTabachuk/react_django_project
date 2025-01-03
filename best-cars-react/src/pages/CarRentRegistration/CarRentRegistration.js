import "./CarRentRegistration.css"
import Header from "../../components/Header/Header.js"
import Footer from "../../components/Footer/Footer.js"

const optionsAndServices = [ {
        icon : "icons/car-rent-registration/infinity.png",
        name : "Безлімітний пробіг",
        price : 45
    },
    {
        icon : "icons/car-rent-registration/insurance.png",
        name : "Страхування авто",
        price : 100
    },
    {
        icon : "icons/car-rent-registration/baby-car-seat.png",
        name : "Дитяче крісло",
        price : 15
    },
    {
        icon : "icons/car-rent-registration/driver.png",
        name : "Власний водій",
        price : 100
    },
    {
        icon : "icons/car-rent-registration/gas-station.png",
        name : "Повний бак",
        price : 50
    }

]

const paymetMethods = [{
        icon: "icons/credit-card.png",
        name:"Картою",
        discount: 10
    },
    {
        icon: "icons/car-rent-registration/money.png",
        name: "Готівкою",
        discount: 0
    }
]



export default function CarRentRegistration(){
    return (
        <>
            <Header></Header>
            
            <h1 className="centered-text">Оформлення оренди авто</h1>
            <div id="rent-registration-grid-container">
                
                {/* 1 */}
                <div className="column">
                    <div id="option-services-wrapper">
                        <h3>Додаткові послуги</h3>
                        <p className="description">Додаткові опції для максимально комфортної подорожі</p>

                        <div id="option-services-container">
                            {optionsAndServices.map(  (option) =>
                                <div className="option-service">
                                    <div className="checkbox-icon-name">
                                        <input type="checkbox" id="example" name="example" />
                                        <img className = "icon" src={option.icon} alt={option.name} />
                                        <span>{option.name}</span>
                                    </div>

                                    <div className="service-price-container">
                                        <span><b>{option.price}$</b></span>
                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>
            
                    <div id="contact-info-wrapper">
                        <h3>Контактні дані</h3>

                        <div id="contanct-info-inputs">
                            <div className="label-input">
                                <label for="fullname">ПІБ:</label>
                                <br />
                                <input type="text" id="fullname" name="fullname" placeholder="Введіть ваше ПІБ" required/>
                            </div>

                            <div className="label-input">
                                <label for="phone">Телефон:</label>
                                <br />
                                <input type="tel" id="phone" name="phone" placeholder="+380123456789" pattern="\+380\d{9}" required/>
                            </div>

                            <div className="label-input">
                                <label for="email">Електронна адреса:</label>
                                <br />
                                <input type="email" id="email" name="email" placeholder="example@email.com" required/>
                            </div>
                        </div>
                    </div>

                    <div id="payment-method-wrapper">
                        <h3>Спосіб оплати</h3>
                        <p className="description">При сплаті онлайн знижка</p>
                        
                        <div id="payment-methods-container">
                        { paymetMethods.map( (method, index) =>
                            <div className="payment-method">{
                                <>
                                <div className = "payment-method-option">
                                    <div className = "radio-icon-name">
                                        <input type="radio" id={"option" + index} name="choice" value={method.name}></input>
                                        <img src={method.icon} alt="" className="icon" />
                                        <label htmlFor={"option" + index}>{method.name}</label>
                                    </div>

                                    <div className="discount-container">
                                        <span><b>
                                            {method.discount === 0 
                                                    ? "немає знижки" 
                                                    : `${method.discount}%`
                                            }</b>
                                        </span>
                                    </div>
                                </div>
                                </>}
                            </div> ) }
                        </div>
                     
                    </div>
                </div>

                {/* 2 */}
                <div className="column column-space-between">     
                    <div id ="comment-wrapper"> 
                        <h3>Коментар</h3>
                        <textarea id="comments" name="comments" rows="4" 
                        placeholder="Напишіть ваш коментар тут..." required></textarea>
                    </div>

                    <div id="order-summary-wrapper">
                        <div id="car-image-name-container">
                            <img src="assets/mercedes_gls.webp" alt="" />
                            <h3>Mercedes GLS</h3>
                        </div>

                        <div id="option-price-container">               
                            <div className="option-price">
                                <span>Повний бак</span>
                                <span><b>50$</b></span>
                            </div>

                            <div className="option-price">
                                <span>Дитяче крісло</span>
                                <span><b>15$</b></span>
                            </div>

                            <div className="option-price">
                                <span>Mercedes GLS x3 дні</span>
                                <span><b>300$</b></span>
                            </div>

                            <div className="option-price">
                                <h3>Всього</h3>
                                <span><b>600$</b></span>
                            </div>
                        </div>
                     
                        <div id="rent-button-container">
                            <button id="confirm-rent-button">Підтвердити бронювання</button>
                        </div>
                    </div>
                </div>
            </div>


            <Footer></Footer>
        </>
    );
}