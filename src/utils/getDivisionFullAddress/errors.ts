import createError from "@fastify/error";

export const NoSuchDivisionError = createError('FST_ERR_NOT_FOUND', "No division with such ID (%s)", 404);

export const DivisionCorruptError = createError('FST_ERR_INTERNAL', "Division nest level corrupted (leaf division id = %s). Please contact the developers.", 500);
