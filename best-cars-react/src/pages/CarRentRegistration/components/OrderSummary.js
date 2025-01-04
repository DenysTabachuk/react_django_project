export default function OrderSummary({carInfo}){
    return (
        <div id="order-summary-wrapper">
            <h2>Результат</h2>

            <div id="car-image-name-container">
                <img src={carInfo.main_image} alt="" />
                <h3> { (carInfo.name)} </h3>
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
    
        </div>
    );
}