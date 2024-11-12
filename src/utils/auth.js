export const useAuth = () => {
    const getToken = () => {
        // Ensure this runs only in the browser (client-side)
        if (typeof window !== "undefined") {
            return localStorage.getItem('token');
        }
        return null;  // Return null on the server-side
    };

    const setToken = (token) => {
        if (typeof window !== "undefined") {
            localStorage.setItem('token', token);
        }
    };

    const clearToken = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
        }
    };

    return { token: getToken(), setToken, clearToken };
};
