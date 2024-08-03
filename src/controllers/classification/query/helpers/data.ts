import { ClassificationQuery, PrismaClient, QueryDetail, QueryResult } from "@prisma/client";
import { InvalidSymptomListError } from "../errors";
import { CLASSIFICATION_MODEL_ID } from "@/config";

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
