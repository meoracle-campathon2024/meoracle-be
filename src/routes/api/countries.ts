import { c_GET_countries } from "@/controllers/countries";
import { TCountryListResponse } from "@/controllers/countries/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_countries(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/', {
        schema: {
            response: {
                200: TCountryListResponse,
            },
        },
    }, c_GET_countries);
}
