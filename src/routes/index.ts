import { FastifyInstance } from "fastify";
import { r_api } from "./api";

export async function allRoutes(server: FastifyInstance) {
    server.register(r_api, { prefix: '/api' });
}
