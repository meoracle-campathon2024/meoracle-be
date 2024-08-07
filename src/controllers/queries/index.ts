import { FastifyReply, FastifyRequest } from "fastify";
import { GetQueriesRequestQuerystring, GetQueriesResponsePayload } from "./types";
import { getAllQueries, getQueryById } from "./helpers";

export async function c_GET_queries(
    req: FastifyRequest<{Querystring: GetQueriesRequestQuerystring}>,
    res: FastifyReply,
): Promise<GetQueriesResponsePayload> {
    const { prisma } = req.server;
    const userId = req.user.id;
    const { query_detail_id } = req.query;

    if (undefined === query_detail_id) {
        return await getAllQueries({ prisma, userId });
    } else {
        return [await getQueryById({ prisma, userId, queryDetailId: query_detail_id })];
    }
}
