import { Link } from 'react-router-dom';
import "./Header.css"

export default function Header(){
    return (
        <header>
        <h1><Link to = '/'>BestCars</Link></h1>

        <navbar>
            <ul>
                <li><Link to = '/'>Парк авто</Link></li>
                <li><Link to = '/'>Умови</Link></li>
                <li><Link to = '/'>Компанія</Link></li>
                <li><Link to = '/'>Контакти</Link></li>
                <li><Link to = '/car-rent'>Оформлення (тимчасово)</Link></li>
                <li><Link to = '/car-info'>Інформація про авто (тимчасово)</Link></li>


                <li id = "sign-in"><Link to = '/'><span>Увійти</span></Link></li>
                <li id = "sign-up"><Link to = '/'><span>Зареєструватися</span></Link></li>
            </ul>
        </navbar>
    </header>
    );
}