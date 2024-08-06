import { IMAGE_MODEL_ID } from "@/config";
import { ImageQuery, PrismaClient, QueryDetail } from "@prisma/client";

export async function saveImageModelQueryInfo({ prisma, userId, userImageFilePaths } : {
    prisma: PrismaClient,
    userId: number,
    userImageFilePaths: string[],
}): Promise<[QueryDetail, ImageQuery]> {
    const queryDetail = await prisma.queryDetail.create({
        data: {
            created_at: new Date(),
            type: IMAGE_MODEL_ID,
        },
    });

    const imageQuery = await prisma.imageQuery.create({
        data: {
            user_id: userId,
            query_detail_id: queryDetail.id,
            user_images: {
                createMany: {
                    data: userImageFilePaths.map(file_path => {
                        return { file_path };
                    }),
                },
            },
        },
    });

    return [queryDetail, imageQuery];
}
