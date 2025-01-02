import "./Footer.css"

const socialMedia = [
    {
        name : "Instagram",
        icon : "/icons/instagram.png",
        url : ""
    },
    {
        name : "Facebook",
        icon : "/icons/facebook.png",
        url : ""
    },
    {
        name : "Twitter",
        icon : "/icons/twitter.png",
        url : ""
    }
]

export default function Footer(){
    return (
        <footer>
            <div id="social-media-icon-container">
                {socialMedia.map( (sm) => 
                <a href="#" key={sm.name}>
                    <img className="icon"src={sm.icon} alt={sm.name}></img>
                </a>
                )}
            </div>

            <div id="additional-services-container">   
                <h3>Додаткові послуги</h3>
                <ul>
                    <li><a href="">Автомобіль на час ремонту</a></li>
                    <li><a href="">Авто на весілля</a></li>
                    <li><a href="">Оренда за кордоном</a></li>
                    <li><a href="">Погодинна оренда авто</a></li>
                    <li><a href="">Лізинг авто</a></li>
                    <li><a href="">Авто з водієм</a></li>
                </ul>
            </div>

            <div id="car-parks-container">   
                <h3>Парк авто</h3>
                <ul>
                    <li><a href="">Оренда авто Київ</a></li>
                    <li><a href="">Оренда авто Львів</a></li>
                    <li><a href="">Оренда авто Одеса</a></li>
                    <li><a href="">Оренда авто Харків</a></li>
                    <li><a href="">Оренда авто Дніпро</a></li>
                    <li><a href="">Оренда авто Полтава</a></li>
                </ul>
            </div>

            <div id="conditions-and-options-container">   
                <h3>Умови та опції</h3>
                <ul>
                    <li><a href="">Фізичні особи</a></li>
                    <li><a href="">Юридичні особи</a></li>
                    <li><a href="">Повне страхування</a></li>
                    <li><a href="">Вартість послуг та опцій</a></li>
                    <li><a href="">Довгострокова оренда</a></li>

                </ul>
            </div>
            

        </footer>
    );
}