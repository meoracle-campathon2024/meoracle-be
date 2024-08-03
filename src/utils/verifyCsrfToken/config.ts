import { type Algorithm as JwtAlgorithm } from "fast-jwt";

export const CSRF_TOKEN_JWT_ALGORITHM: JwtAlgorithm = 'HS256';
export const CSRF_TOKEN_EXPIRATION_TIME_IN_SECONDS: number = 20;
