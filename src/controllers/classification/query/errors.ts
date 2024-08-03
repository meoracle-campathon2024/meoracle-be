import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidSymptomListError = createError('FST_ERR_VALIDATION', DEBUG ? "Invalid symptom list (%s)" : "Client error", 400);
