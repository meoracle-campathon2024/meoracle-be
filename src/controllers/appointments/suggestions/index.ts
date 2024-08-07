import { FastifyReply, FastifyRequest } from "fastify";
import { SuggestionsQuerystring, SuggestionsResponsePayload } from "./types";
import { getSuggestions } from "./helpers";
import { getLatLonFromIpAddress } from "@/utils/inspectIpAddress";

export async function c_GET_appointments_suggestions(
    req: FastifyRequest<{Querystring: SuggestionsQuerystring}>,
    res: FastifyReply,
): Promise<SuggestionsResponsePayload> {
    const { query_detail_id: queryDetailId } = req.query;

    let { lat, lon } = req.query;

    if (undefined === lat || undefined === lon) {
        [lat, lon] = await getLatLonFromIpAddress({
            prisma: req.server.prisma,
            ipAddress: req.ip,
        });
    }

    const { prisma } = req.server;

    const suggestions = await getSuggestions({ prisma, queryDetailId, lat, lon });

    return suggestions;
}
