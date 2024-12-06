import "./CarCard.css"

export default function CarCard({carObject}){
    const rentTime = ['1-3', '4-9', '10-25', '26+'] 

    return (
        <div className="car-card">
            <h2>{carObject.name}</h2>
            <img src={carObject.mainImage} alt="" />
          
            
            <div className="time-price-container">
                <div className = "time-price">
                    <span><big><b>Час оренди</b></big></span>                
                    <span><big><b>Ціна</b></big></span>
                </div>

                { carObject.prices.map( (price, index) =>
                <div className = "time-price">
                    <span><big>{rentTime[index]} діб</big></span>                
                    <span><big><b>{price} $</b> за добу</big></span>
                </div>
                )}
            </div>
            
            <button className="rent-button">Орендувати</button>
                      



        </div>
    );
}