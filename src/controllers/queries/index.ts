import { FastifyReply, FastifyRequest } from "fastify";
import { GetQueriesResponsePayload } from "./types";
import { getAllQueries } from "./helpers";

export async function c_GET_queries(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<GetQueriesResponsePayload> {
    const { prisma } = req.server;
    const userId = req.user.id;

    return await getAllQueries({ prisma, userId });
}
