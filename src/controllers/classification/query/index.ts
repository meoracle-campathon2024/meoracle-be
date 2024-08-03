import { saveClassificationQueryInfo, getClassifcationSymptomsFromIds } from "./helpers/data";
import { FastifyReply, FastifyRequest } from "fastify";
import { ClassificationQueryRequestPayload, ClassificationQueryResponsePayload, TClassificationQueryResponsePayload } from "./types";
import { callClassificationModel } from "./helpers/model";
import { Value } from "@sinclair/typebox/value";
import { saveDetectedDiseases } from "@/utils/saveDetectedDiseases";

export async function c_POST_classification_query(
    req: FastifyRequest<{ Body: ClassificationQueryRequestPayload }>,
    res: FastifyReply,
): Promise<ClassificationQueryResponsePayload> {
    const prisma = req.server.prisma;
    const selectedClassificationSymptomIdList = req.body.selected_classification_symptom_ids;

    const symptoms = await getClassifcationSymptomsFromIds({ prisma, selectedClassificationSymptomIdList });

    const [diseasesDetected, [queryDetail]] = await Promise.all([
        callClassificationModel(symptoms),
        saveClassificationQueryInfo({
            prisma,
            userId: req.user.id,
            validatedClassificationSymptomIdList: symptoms.map(x => x.id),
        }),
    ]);

    const queryResults = await saveDetectedDiseases({
        prisma, diseasesDetected,
        queryDetailId: queryDetail.id,
    });

    return Value.Cast(TClassificationQueryResponsePayload, queryResults);
}
