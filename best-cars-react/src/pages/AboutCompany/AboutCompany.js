import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";

export default function AboutCompany() {
  return (
    <>
      <Header></Header>
      <div id="page-content">
        <h2>Хто ми ?</h2>
        <p>
          Компанія <strong>BestCars</strong> — ваш надійний партнер у сфері
          оренди автомобілів в Україні. Ми спеціалізуємося на наданні якісних,
          зручних та доступних рішень для тих, хто цінує свободу пересування.
          Незалежно від того, чи плануєте ви подорож, ділову поїздку або шукаєте
          авто на заміну, BestCars пропонує автомобілі для будь-яких потреб.
        </p>

        <h2>Чому обирають BestCars?</h2>
        <ul>
          <li>
            <strong>Широкий вибір авто:</strong> У нашому автопарку представлені
            різні класи автомобілів: від економічних моделей до преміальних та
            сімейних мінівенів. Кожен автомобіль проходить регулярне технічне
            обслуговування, що гарантує його безпеку та надійність.
          </li>
          <li>
            <strong>Простота оформлення:</strong> Ми пропонуємо швидкий і
            зрозумілий процес оренди. Все, що вам потрібно, — це водійське
            посвідчення, паспорт і декілька хвилин вашого часу.
          </li>
          <li>
            <strong>Гнучкі тарифи:</strong> Наша цінова політика орієнтована на
            клієнтів. Ви можете обрати оренду на день, тиждень або довготривалий
            період за вигідними умовами.
          </li>
          <li>
            <strong>Додаткові послуги:</strong> Для вашого комфорту ми
            пропонуємо додаткові опції, такі як GPS-навігація, дитячі крісла,
            повне страхування та технічна підтримка 24/7.
          </li>
        </ul>

        <h2>Наші переваги</h2>
        <ul>
          <li>
            <strong>Доступність:</strong> офіси у великих містах України (Київ,
            Львів, Одеса, Харків, Дніпро).
          </li>
          <li>
            <strong>Сучасний автопарк:</strong> тільки нові та надійні
            автомобілі.
          </li>
          <li>
            <strong>Прозорість умов:</strong> жодних прихованих платежів чи
            неприємних сюрпризів.
          </li>
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}
