export const refreshExpiredToken = async (refreshToken) => {
    console.log("refreshToken");
    try {
        const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),

        });

        if (!response.ok) {
            console.log(response.data);
            throw new Error('Не вдалося оновити токен');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
    } catch (error) {
        console.error('Помилка оновлення токена:', error);
        return null;
    }
};
