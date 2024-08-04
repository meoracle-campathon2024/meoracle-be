import { IMAGE_MODEL_ID } from "@/config";
import { ImageQuery, PrismaClient, QueryDetail } from "@prisma/client";

export async function saveImageModelQueryInfo({ prisma, userId, userImageFilePaths } : {
    prisma: PrismaClient,
    userId: number,
    userImageFilePaths: string[],
}): Promise<[QueryDetail]> {
    const queryDetail = await prisma.queryDetail.create({
        data: {
            created_at: new Date(),
            type: IMAGE_MODEL_ID,
            image_query: {
                create: {
                    user_id: userId,
                },
            },
        },
    });

    return [queryDetail];
}