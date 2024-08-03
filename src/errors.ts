import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const ModelUnavailableError = createError('FST_ERR_INTERNAL', DEBUG ? "Model unavailable (%s)" : "Internal Server Error", 500);

export const ModelMalfunctionError = createError('FST_ERR_INTERNAL', DEBUG ? "Model malfunctioned (%s ; %s)" : "Internal Server Error", 500);
