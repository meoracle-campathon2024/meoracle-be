import { FastifyReply, FastifyRequest } from "fastify";
import { NlpQueryRequestPayload, NlpQueryResponsePayload, TNlpQueryResponsePayload } from "./types";
import { callNlpModel } from "./helpers/model";
import { saveNlpQueryInfo } from "./helpers/data";
import { saveDetectedDiseases } from "@/utils/saveDetectedDiseases";
import { Value } from "@sinclair/typebox/value";

export async function c_POST_nlp_query(
    req: FastifyRequest<{ Body: NlpQueryRequestPayload }>,
    res: FastifyReply,
): Promise<NlpQueryResponsePayload> {
    const { prisma } = req.server;
    const queryContent = req.body.query_content;

    const [diseasesDetected, [queryDetail]] = await Promise.all([
        callNlpModel({ queryContent }),
        saveNlpQueryInfo({
            prisma,
            userId: req.user.id,
            queryContent,
        }),
    ]);

    const queryResults = await saveDetectedDiseases({
        prisma, diseasesDetected,
        queryDetailId: queryDetail.id,
    });

    return Value.Cast(TNlpQueryResponsePayload, queryResults);
}
