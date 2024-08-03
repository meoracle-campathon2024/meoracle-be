import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidAccessTokenError = createError('FST_ERR_AUTH', DEBUG ? "Invalid access token (%s)" : "Unauthenticated", 401);
