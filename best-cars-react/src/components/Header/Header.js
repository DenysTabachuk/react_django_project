import { Link } from 'react-router-dom';
import "./Header.css"

import { jwtDecode } from "jwt-decode";



function isTokenValid(token) {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Перевіряємо, чи не протермінований токен
    } catch (error) {
        return false; // Якщо токен некоректний
    }
}


export default function Header(){
    const accessToken = localStorage.getItem("access_token");
    const isAdmin = localStorage.getItem("is_admin") === "true"; 

    console.log(isAdmin);

    return (
        <header>
        <h1><Link to = '/'>BestCars</Link></h1>

        <navbar>
            <ul>
                <li><Link to = '/'>Парк авто</Link></li>
                <li><Link to = '/terms-of-rent'>Умови</Link></li>
                <li><Link to = '/about-company'>Компанія</Link></li>
                <li><Link to = '/contact-info'>Контакти</Link></li>
                <li><Link to = '/car-rent'>Оформлення (тимчасово)</Link></li>

                {isAdmin &&  <li><Link to = '/add-car'>Створити нове оголошення</Link></li>}
    
                {isTokenValid(accessToken) ? 
                    <li id="my-profile"><Link to='/user-profile'><span>Мій профіль</span></Link></li>
                : 
                    <>
                        <li id="sign-in"><Link to='/login'><span>Увійти</span></Link></li>
                        <li id="sign-up"><Link to='/register'><span>Зареєструватися</span></Link></li>  
                    </>
                }

            </ul>
        </navbar>
    </header>
    );
}