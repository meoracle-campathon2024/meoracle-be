import { c_GET_divisions } from "@/controllers/divisions/getAll";
import { TDivisionListRequestQuerystring } from "@/controllers/divisions/getAll/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_divisions(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/', {
        schema: {
            querystring: TDivisionListRequestQuerystring,
        }
    }, c_GET_divisions);
}
