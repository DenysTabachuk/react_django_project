import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';


export default function TermsOfRent(){
    return (
        <>
            <Header></Header>
            <div id="page-content">
                <h1>Умови оренди авто</h1>
                <h2>Основні умови</h2>

                <ul className='unstyled-list'>
                    <li>✅ Мінімальний вік водія: 21 рік.</li>
                    <li>✅ Стаж водіння: не менше 2 років.</li>
                    <li>✅ Необхідні документи: Паспорт та водійське посвідчення.</li>
                    <li>✅ Застава: вноситься під час оформлення договору.</li>
                </ul>

                <h2>Тарифи та оплата</h2>
                <ul className='unstyled-list'>
                    <li>
                        <div className="icon-text-item">
                            <img src="icons/credit-card.png" alt="" className="icon" />
                            Орендна плата: залежить від обраного автомобіля та періоду оренди.
                        </div>
                    </li>
                    <li>
                        <div className="icon-text-item">
                            <img src="icons/credit-card.png" alt="" className="icon" />
                            Оплата: готівкою або банківською карткою.
                        </div>
                    </li>
                </ul>

                <h2>Права та обов'язки орендаря</h2>
                <ul className='unstyled-list'>
                    <li>✔️ Орендар зобов’язаний повернути авто у тому ж стані, в якому воно було отримане.</li>
                    <li>✔️ Забороняється передавати автомобіль третім особам без погодження.</li>
                    <li>✔️ Забороняється участь у перегонах та використання авто поза дорогами загального користування.</li>
                </ul>
            </div>
            <Footer></Footer>
        </>
    );
}