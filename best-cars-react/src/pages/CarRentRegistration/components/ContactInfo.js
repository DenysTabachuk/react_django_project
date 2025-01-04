export default function ContactInfo({userInfo, onChangeAction}){
    return(
        <div id="contact-info-wrapper">
            <h3>Контактні дані</h3>

            <div id="contanct-info-inputs">
                <div className="label-input">
                    <label htmlFor="first_name">Ім'я:</label>
                    <br />
                    <input 
                    type="text" 
                    id="firtst_name" 
                    name="first_name" 
                    placeholder="Введіть ваше Ім'я"
                    value={userInfo.first_name}
                    onChange={onChangeAction}
                    required/>
                </div>

                <div className="label-input">
                    <label htmlFor="last_name">Фамілія:</label>
                    <br />
                    <input 
                    type="text" 
                    id="last_name" 
                    name="last_name" 
                    placeholder="Введіть вашу фамілію" 
                    value={userInfo.last_name}
                    onChange={onChangeAction}
                    required/>
                </div>
                
                <div className="label-input">
                    <label htmlFor="phone_number">Телефон:</label>
                    <br />
                    <input 
                    type="tel" 
                    id="phone_number" 
                    name="phone_number" 
                    placeholder="+380123456789" 
                    pattern="\+380\d{9}" 
                    value={userInfo.phone_number}
                    onChange={onChangeAction}
                    required/>
                </div>

                <div className="label-input">
                    <label htmlFor="email">Електронна адреса:</label>
                    <br />
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="example@email.com" 
                    value={userInfo.email}
                    onChange={onChangeAction}
                    required/>
                </div>
            </div>
        </div>
    );
}