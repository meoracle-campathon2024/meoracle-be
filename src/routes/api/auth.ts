import { c_GET_api_auth_anonymous } from "@/controllers/auth/anonymous";
import { TAuthResponse } from "@/controllers/auth/anonymous/types";
import { csrfProtected } from "@/middleware/csrfProtected";
import { FastifyInstance } from "fastify";

export async function r_api_auth(server: FastifyInstance) {
    server.register(r_api_auth_anonymous, { prefix: '/anonymous' });
}

async function r_api_auth_anonymous(server: FastifyInstance) {
    server.addHook('onRequest', csrfProtected);

    server.get('/', {
        schema: {
            response: {
                200: TAuthResponse,
            },
        },
    }, c_GET_api_auth_anonymous);
}
