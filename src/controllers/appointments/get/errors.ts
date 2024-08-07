import createError from "@fastify/error";

export const AppointmentNotFoundError = createError('FST_ERR_NOT_FOUND', "No appointment with such ID (%s)", 404);
