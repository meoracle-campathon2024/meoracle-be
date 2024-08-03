import { PrismaClient, QueryResult } from "@prisma/client";
import { ListOfDiseasesDetected } from "./types";

export async function saveDetectedDiseases({ prisma, diseasesDetected, queryDetailId } : {
    prisma: PrismaClient,
    diseasesDetected: ListOfDiseasesDetected,
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
