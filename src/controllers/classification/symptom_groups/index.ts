import { ClassificationSymptomGroupWithChildren } from "@/types/ClassificationSymptomGroupsWithChildren";
import { FastifyReply, FastifyRequest } from "fastify";
import { getClassificationSymptomGroups } from "./helpers";

export async function c_GET_classification_symptom_groups(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<ClassificationSymptomGroupWithChildren[]> {
    const { prisma } = req.server;
    return await getClassificationSymptomGroups({ prisma });
}
