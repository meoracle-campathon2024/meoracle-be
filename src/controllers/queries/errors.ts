import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidQueryDetailError = createError('FST_ERR_INTERNAL', DEBUG ? "Invalid query detail" : "Internal Server Error", 500);
