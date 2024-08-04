import { c_POST_nlp_query } from "@/controllers/nlp/query";
import { TNlpQueryRequestPayload, TNlpQueryResponsePayload } from "@/controllers/nlp/query/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_nlp(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.post('/query', {
        schema: {
            body: TNlpQueryRequestPayload,
            response: {
                200: TNlpQueryResponsePayload,
            },
        },
    }, c_POST_nlp_query);
}
