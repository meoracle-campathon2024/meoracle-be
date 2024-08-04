import { FastifyReply, FastifyRequest } from "fastify";
import { getCountries } from "./helpers";
import { CountryListResponse } from "./types";

export async function c_GET_countries(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<CountryListResponse> {
    const countries = await getCountries({
        prisma: req.server.prisma,
    });

    return countries;
}