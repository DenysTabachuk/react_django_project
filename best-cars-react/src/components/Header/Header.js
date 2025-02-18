import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

import { jwtDecode } from "jwt-decode";
import { refreshExpiredToken } from "../../api/refreshToken";

function isTokenValid(token) {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

export default function Header() {
  let accessToken = localStorage.getItem("access_token");
  let refreshToken = localStorage.getItem("refresh_token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <h1>
        <Link to="/">BestCars</Link>
      </h1>

      <button className="menu-button" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <navbar className={"menu " + (menuOpen && "opened")}>
        <ul>
          <li>
            <Link to="/">Парк авто</Link>
          </li>
          <li>
            <Link to="/terms-of-rent">Умови</Link>
          </li>
          <li>
            <Link to="/about-company">Компанія</Link>
          </li>
          <li>
            <Link to="/contact-info">Контакти</Link>
          </li>
          <li>
            <Link to="/locations">Де нас знайти</Link>
          </li>

          {isAdmin && (
            <>
              <li>
                <Link to="/add-car">Додати нове авто</Link>
              </li>
              <li>
                <Link to="/rentals">Оренди</Link>
              </li>
            </>
          )}

          {isTokenValid(accessToken) ? (
            <li id="my-profile">
              <Link to="/user-profile">
                <span>Мій профіль</span>
              </Link>
            </li>
          ) : (
            <>
              <li id="sign-in">
                <Link to="/login">
                  <span>Увійти</span>
                </Link>
              </li>
              <li id="sign-up">
                <Link to="/register">
                  <span>Зареєструватися</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </navbar>
    </header>
  );
}
