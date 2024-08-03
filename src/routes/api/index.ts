import { FastifyInstance } from "fastify";
import { r_api_auth } from "./auth";
import { r_api_classification } from "./classification";

export async function r_api(server: FastifyInstance) {
    server.register(r_api_auth, { prefix: '/auth' });

    server.register(r_api_classification, { prefix: '/classification' });
}
