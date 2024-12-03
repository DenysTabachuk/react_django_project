export default function CarCard({carObject}){
    return (
        <div className="car-card">
            <img src={carObject.mainImage} alt="" />
            <h2>{carObject.name}</h2>

            <ul>
                <li>
                    <div className="time-price">
                        <span></span>
                    </div>
                </li>
            </ul>

        </div>
    );
}