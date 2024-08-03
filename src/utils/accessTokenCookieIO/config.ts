import { BACKEND_URL } from "@/env";

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
export const ACCESS_TOKEN_COOKIE_DOMAIN = BACKEND_URL
    .replace(/^[^:]+:\/\//, '')     // remove URL scheme
    .replace(/:\d+/, '');           // remove port number
