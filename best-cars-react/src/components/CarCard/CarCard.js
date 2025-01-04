import "./CarCard.css"

export default function CarCard({carObject, customButton}){
    console.log("car: ", carObject);
    return (
        <div className="car-card">
            <h2>{carObject.name}</h2>
            <img src={carObject.mainImage} alt={carObject.name + " photo"} />
          
            <div className="time-price-container">
                <div className = "time-price">
                    <span><big><b>Час оренди</b></big></span>                
                    <span><big><b>Ціна</b></big></span>
                </div>

                { carObject.prices.map( (timePrice) =>
                <div className = "time-price" key={timePrice.range + carObject.name}>
                    <span><big>{timePrice.range} діб</big></span>                
                    <span><big><b>{timePrice.price} $</b> за добу</big></span>
                </div>
                )}
            </div>

            {customButton && (
                <div className="custom-button-container">
                    {customButton}
                </div>
            )}
            
         
        </div>
    );
}