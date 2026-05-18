import { withBase } from "./apiConfig";

// Centralized endpoints list — import values from here in services and contexts
export const AUTH_LOGIN = withBase("/api/auth/login");

// export other endpoints as needed
export const AUTH_REGISTER = withBase("/api/auth/register");

export default {
    AUTH_LOGIN,
    AUTH_REGISTER
};
