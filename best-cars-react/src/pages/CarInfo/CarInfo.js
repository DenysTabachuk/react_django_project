import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import CutsomSlider from '../../components/CustomSlider/СustomSlider.js'
import CarCard from "../../components/CarCard/CarCard.js"
import "./CarInfo.css"

const pathToImages = "assets/";

const carInfo = {
    name : "Volkswagen Jetta",
    gearBox : "Автомат",
    fuelType : "Дизель",
    consumption : 6.5,
    engineVolume: 1.6,
    enginePower: 110,
    prices : [390, 350, 325 ,250],
    mainImage : pathToImages+"volkswagen-jetta.webp",
    additionalFunctions : ['Android Auto / CarPlay', "AUX / USB", "Bluetooth", 
        "Задня камера", "Круїз контроль", "Клімат-контроль"],
    images : ["volkswagen-jetta-1.webp", "volkswagen-jetta-2.webp" ,"volkswagen-jetta-3.webp"],
    description: `Volkswagen Jetta — це стильний і комфортний седан, який поєднує в собі елегантний дизайн,
     просторий інтер'єр і передові технології. Ідеальний для тих, хто шукає надійний автомобіль для щоденних поїздок 
     або довгих подорожей. Завдяки ефективним моторам, плавному ходу та сучасним системам безпеки, Jetta забезпечує 
     відмінну керованість і комфорт на дорозі. Прокат Volkswagen Jetta — це чудовий вибір для тих, хто 
     хоче насолоджуватися комфортом та якістю німецького автопрома.`

}


export default function CarInfo(){
    return(
        <>
        <Header></Header>
        <div id="car-info-container">
            <div id="column1">
                <h1>Прокат {carInfo.name}</h1>
                <CutsomSlider>
                    {carInfo.images.map((image, index) => {
                        console.log(image);
                    return <img key={index} src={pathToImages + image} alt={image} />;
                    })}
                </CutsomSlider>


                <div id="main-characteristics-container">
                    <ul>
                        <li>
                            <img src="icons/car-info/gearbox.png" className='icon' alt="" />
                            <big>{carInfo.gearBox}</big>
                        </li>
                        <li>
                            <img src="icons/car-info/fuel.png" className='icon' alt="" />
                            <big>{carInfo.fuelType}/{carInfo.consumption}</big>
                        </li>
                        <li>
                            <img src="icons/car-info/car-engine.png" className='icon' alt="" />
                            <big>{carInfo.engineVolume} л {carInfo.enginePower} к.с.</big>
                        </li>
                    </ul>
                </div>

                <div id="additional-functions-wrapper">
                    <h2>Додаткові функції</h2>
                    <div id="additional-functions-container">
                        <ul>
                        {carInfo.additionalFunctions.map((func, index) => 
                            <li key={index}>
                                <img src="icons/car-info/check-mark.png" alt="" className="icon" />
                                <span>{func}</span>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div id="description-continaer">
                    <h2>Опис</h2>
                    <p><big>{carInfo.description}</big></p>
                </div>
                    </div>
            <div id="column2">
    
                <CarCard carObject={carInfo}></CarCard>
            </div>
        </div>

        <Footer></Footer>
        </>
    )
}