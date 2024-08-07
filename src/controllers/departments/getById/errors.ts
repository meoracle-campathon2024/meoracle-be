import createError from "@fastify/error";

export const DepartmentNotFoundError = createError('FST_ERR_NOT_FOUND', "No department with such ID (%s)", 404);
