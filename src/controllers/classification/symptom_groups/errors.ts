import { DEBUG } from "@/env";
import createError from "@fastify/error";

export const InvalidInternalDataError = createError('FST_ERR_INTERNAL', DEBUG ? "Invalid internal data" : "App error", 500);
