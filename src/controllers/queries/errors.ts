import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidQueryDetailError = createError('FST_ERR_INTERNAL', DEBUG ? "Invalid query detail" : "Internal Server Error", 500);
export const QueryDetailNotFoundError = createError('FST_ERR_NOT_FOUND', "No query detail with such ID (%s)", 404);
export const QueryNotOwnedByUserError = createError('FST_ERR_NOT_FOUND', DEBUG ? "You are not authorized to view this query. (%s)" : "No query detail with such ID (%s)", 404);
