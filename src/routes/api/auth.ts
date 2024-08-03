import { c_GET_api_auth_anonymous } from "@/controllers/auth/anonymous";
import { csrfProtected } from "@/middleware/csrfProtected";
import { FastifyInstance } from "fastify";

async function r_api_auth_anonymous(server: FastifyInstance) {
    server.addHook('onRequest', csrfProtected);

    server.get('/', c_GET_api_auth_anonymous);
}

export async function r_api_auth(server: FastifyInstance) {
    server.register(r_api_auth_anonymous, { prefix: '/anonymous' });
}
