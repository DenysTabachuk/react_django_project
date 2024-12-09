export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(?:\+38|38)?0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};


export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Мінімум 6 символів, одна велика літера, одна цифра
    return passwordRegex.test(password);
};