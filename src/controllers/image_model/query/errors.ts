import createError from "@fastify/error";

export const InvalidInputImageLinkError = createError('FST_ERR_VALIDATION', "Invalid input image link", 400);
export const NotAnImageError = createError('FST_ERR_VALIDATION', "Input file is not an image.", 400);
export const InputImageNotFoundError = createError('FST_ERR_NOT_FOUND', "Input image not found", 404);
