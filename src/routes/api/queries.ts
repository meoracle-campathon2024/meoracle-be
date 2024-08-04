import { c_GET_queries } from "@/controllers/queries";
import { TGetQueriesResponsePayload } from "@/controllers/queries/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_queries(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/', {
        schema: {
            response: {
                200: TGetQueriesResponsePayload,
            },
        },
    }, c_GET_queries);
}
