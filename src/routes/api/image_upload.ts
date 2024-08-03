import { c_GET_image_upload_token } from "@/controllers/image_upload_token";
import { TImageUploadTokenResponsePayload } from "@/controllers/image_upload_token/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_image_upload_token(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/', {
        schema: {
            response: {
                200: TImageUploadTokenResponsePayload,
            },
        },
    }, c_GET_image_upload_token);
}
