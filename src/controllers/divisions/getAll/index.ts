import { FastifyReply, FastifyRequest } from "fastify";
import { DivisionListRequestQuerystring, DivisionListResponse } from "./types";
import { getAllDivisionsOfCountry } from "../helpers";

export async function c_GET_divisions(
    req: FastifyRequest<{Querystring: DivisionListRequestQuerystring}>,
    res: FastifyReply,
): Promise<DivisionListResponse> {
    return await getAllDivisionsOfCountry({
        prisma: req.server.prisma,
        countryId: req.query.country_id,
    });
}
