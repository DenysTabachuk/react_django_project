import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";


export default function ContactInformation(){
    return (
        <>
         <Header></Header>
          <div id="page-content">
            <h1 className="centered-text">Контактна інформація</h1>
            <p><big>Будь ласка, не телефонуйте в неробочий час, працівники теж люди і потребують відпочинку !!! З любов'ю ваші BestCars.</big></p>
            <address>
                <div className="contact-info-item">
                    <b><big>Телефони: </big></b>
                    <br/>
                    <ul className="unstyled-list">
                        <li>  
                            <a className = "no-decoration-link" href="tel:+380501234567">+380 50 123 45 67</a>
                        </li>

                        <li>
                            <a className = "no-decoration-link" href="tel:+380501234568">+380 50 123 45 68</a>
                        </li>
                    </ul>


                    <b>Години прийому дзвінків</b>
                    <ul className="unstyled-list">
                        <li>Понеділок 9:00 - 18:00</li>
                        <li>Вівторок 9:00 - 18:00</li>
                        <li>Середа 9:00 - 18:00</li>
                        <li>Четвер 9:00 - 18:00</li>
                        <li>П'ятниця 9:00 - 18:00</li>
                        <li>Субота 10:00 - 16:00</li>
                        <li>Неділя 10:00 - 16:00</li>

                    </ul>
                </div>

                <div className="contact-info-item">
                    <b><big>Email</big></b>
                    <ul className="unstyled-list">
                        <li>
                           <a className = "no-decoration-link" href="BestCars@gmail.com">BestCars@gmail.com</a>                
                        </li>
                    </ul>
                </div>
    
            </address>
          </div>
         <Footer></Footer>
        </>
    );
}