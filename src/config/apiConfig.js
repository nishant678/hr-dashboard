// Central API config — reads base URL from Vite env or falls back to production URL
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://hr-spring-backend.onrender.com";
export const API_BASE_URL = "http://localhost:8080";

export const withBase = (path) => {
    if (!path) return API_BASE_URL;
    // ensure single slash between base and path
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
};

export default {
    API_BASE_URL,
    withBase
};
