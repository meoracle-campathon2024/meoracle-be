import { NLP_MODEL_ID } from "@/config";
import { NlpQuery, PrismaClient, QueryDetail } from "@prisma/client";

export async function saveNlpQueryInfo({ prisma, userId, queryContent } : {
    prisma: PrismaClient,
    userId: number,
    queryContent: string
}): Promise<[QueryDetail, NlpQuery]> {
    // 1. CREATE QueryDetail
    // 2. CREATE NlpQuery

    const queryDetail = await prisma.queryDetail.create({
        data: {
            created_at: new Date(),
            type: NLP_MODEL_ID,
        },
    });

    const nlpQuery = await prisma.nlpQuery.create({
        data: {
            user_id: userId,
            query_detail_id: queryDetail.id,
            query_content: queryContent,
        },
    });

    return [queryDetail, nlpQuery];
}
