import createError from "@fastify/error";

export const InvalidIpAddressError = createError('FST_ERR_VALIDATION', 'Invalid IP address', 500 /* not 400 since we won't be validating user input */);
