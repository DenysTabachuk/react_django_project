export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(?:\+38|38)?0\d{9}$/;
  return phoneRegex.test(phoneNumber);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]{6,}$/;
  return passwordRegex.test(password);
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};
