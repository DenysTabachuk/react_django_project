export const optionsAndServices = [ {
    icon : "/icons/car-rent-registration/infinity.png",
    name : "Безлімітний пробіг",
    price : 45
    },
    {
        icon : "/icons/car-rent-registration/insurance.png",
        name : "Страхування авто",
        price : 100
    },
    {
        icon : "/icons/car-rent-registration/baby-car-seat.png",
        name : "Дитяче крісло",
        price : 15
    },
    {
        icon : "/icons/car-rent-registration/driver.png",
        name : "Власний водій",
        price : 100
    },
    {
        icon : "/icons/car-rent-registration/gas-station.png",
        name : "Повний бак",
        price : 50
    }
]


export default function OptionServices({onChangeAction, values}){
    return (
        <div id="option-services-wrapper">
        <h3>Додаткові послуги</h3>
        <p className="description">Додаткові опції для максимально комфортної подорожі</p>

        <div id="option-services-container">
            {optionsAndServices.map(  (option) =>
                <div className="option-service">
                    <div className="checkbox-icon-name">
                        <input type="checkbox"
                         id={option.name} 
                         name={option.name}
                         onChange={onChangeAction}
                         value = {values[option.name]}
                         />


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

    );
}