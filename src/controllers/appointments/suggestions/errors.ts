import createError from "@fastify/error";

export const QueryDetailNotFoundError = createError('FST_ERR_NOT_FOUND', "No query detail with such ID: %s", 404);
