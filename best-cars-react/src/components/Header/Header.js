import { Link } from 'react-router-dom';
import "./Header.css"

export default function Header(){
    return (
        <header>
        <h1>BestCars</h1>

        <navbar>
            <ul>
                <li><Link to = '/'>Парк авто</Link></li>
                <li><Link to = '/'>Умови</Link></li>
                <li><Link to = '/'>Компанія</Link></li>
                <li><Link to = '/'>Контакти</Link></li>
                <li id = "sign-in"><Link to = '/'>Увійти</Link></li>
                <li id = "sign-up"><Link to = '/'>Зареєструватися</Link></li>
            </ul>
        </navbar>
    </header>
    );
}