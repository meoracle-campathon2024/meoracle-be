import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidCsrfTokenError = createError('FST_ERR_CSRF_INVALID', DEBUG ? "Invalid CSRF token (%s)" : "App error", 403);
