import { FastifyInstance } from "fastify";
import { r_api_auth } from "./auth";
import { r_api_classification } from "./classification";
import { r_api_image_upload_token } from "./image_upload_token";
import { r_api_image_model } from "./image_model";
import { r_api_nlp } from "./nlp";
import { r_api_queries } from "./queries";
import { r_api_divisions } from "./divisions";
import { r_api_countries } from "./countries";

export async function r_api(server: FastifyInstance) {
    server.register(r_api_auth, { prefix: '/auth' });

    server.register(r_api_classification, { prefix: '/classification' });

    server.register(r_api_image_upload_token, { prefix: '/image-upload-token' });

    server.register(r_api_image_model, { prefix: '/image-model' });

    server.register(r_api_nlp, { prefix: '/nlp' });
    
    server.register(r_api_queries, { prefix: '/queries' });

    server.register(r_api_divisions, { prefix: '/divisions' });

    server.register(r_api_countries, { prefix: '/countries' });
}
