const baseUrl = window.location.hostname === "localhost" ? 'http://localhost:8000' : "https://shoppybackend.herokuapp.com"

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/${fileName}`
}