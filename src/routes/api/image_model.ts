import { c_POST_image_model_query } from "@/controllers/image_model/query";
import { TImageModelQueryRequestPayload, TImageModelQueryResponsePayload } from "@/controllers/image_model/query/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_image_model(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.post('/query', {
        schema: {
            body: TImageModelQueryRequestPayload,
            response: {
                200: TImageModelQueryResponsePayload,
            },
        },
    }, c_POST_image_model_query);
}
