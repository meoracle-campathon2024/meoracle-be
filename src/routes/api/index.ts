import { FastifyInstance } from "fastify";
import { r_api_auth } from "./auth";
import { r_api_classification } from "./classification";
import { r_api_image_upload_token } from "./image_upload_token";
import { r_api_image_model } from "./image_model";

export async function r_api(server: FastifyInstance) {
    server.register(r_api_auth, { prefix: '/auth' });

    server.register(r_api_classification, { prefix: '/classification' });

    server.register(r_api_image_upload_token, { prefix: '/image-upload-token' });

    server.register(r_api_image_model, { prefix: '/image-model' });
}
