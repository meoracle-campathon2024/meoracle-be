import { FastifyInstance } from "fastify";
import { r_api_auth } from "./auth";

export async function r_api(server: FastifyInstance) {
    server.register(r_api_auth, { prefix: '/auth' });
}