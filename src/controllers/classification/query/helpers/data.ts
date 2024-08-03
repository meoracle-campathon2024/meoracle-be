import { ClassificationQuery, PrismaClient, QueryDetail, QueryResult } from "@prisma/client";
import { InvalidSymptomListError } from "../errors";
import { CLASSIFICATION_MODEL_ID } from "@/config";
import { ListOfDiseasesDetectedByClassificationModel } from "../types";
import { QueryResultListResponse } from "@/types/QueryResultListResponse";

export async function getClassifcationSymptomsFromIds({ prisma, selectedClassificationSymptomIdList } : {
    prisma: PrismaClient,
    selectedClassificationSymptomIdList: number[],
}): Promise<{
    id: number,
    vector_index: number,
}[]> {
    const symptoms = await prisma.classificationSymptom.findMany({
        where: {
            OR: selectedClassificationSymptomIdList.map(id => ({ id })),
        },
        select: {
            id: true,
            vector_index: true,
        },
    });

    // TODO: Notify invalid symptoms

    if (symptoms.length === 0) {
        throw new InvalidSymptomListError('empty list');
    }

    return symptoms;
}

export async function saveClassificationQueryInfo({ prisma, userId, validatedClassificationSymptomIdList } : {
    prisma: PrismaClient,
    userId: number,
    validatedClassificationSymptomIdList: number[],
}): Promise<[QueryDetail, ClassificationQuery]> {
    // 1. CREATE QueryDetail
    // 2. CREATE ClassificationQuery
    // 3. CREATE _ClassificationQueryToClassificationSymptom (many-to-many relation)

    const queryDetail = await prisma.queryDetail.create({
        data: {
            created_at: new Date(),
            type: CLASSIFICATION_MODEL_ID,
        },
    });

    const classificationQuery = await prisma.classificationQuery.create({
        data: {
            user_id: userId,
            query_detail_id: queryDetail.id,
            classification_symptoms: {
                connect: validatedClassificationSymptomIdList.map(x => {
                    return { id: x };
                }),
            },
        },
    });

    return [queryDetail, classificationQuery];
}

export async function saveDetectedDiseases({ prisma, diseasesDetected, queryDetailId } : {
    prisma: PrismaClient,
    diseasesDetected: ListOfDiseasesDetectedByClassificationModel,
    queryDetailId: number,
}): Promise<QueryResult[]> {
    const created_at = new Date();

    return await Promise.all(
        diseasesDetected.map(({ name, category_id }, idx) => {
            const data = {
                created_at,
                disease_name: name,
                disease_category_id: category_id,
                query_detail_id: queryDetailId,
                priority: idx,
                fed_back: false,
                feedback_accuracy: 0.0,
            };

            return prisma.queryResult.create({ data });
        }),
    );
}
