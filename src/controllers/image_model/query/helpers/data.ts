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
            image_query: {
                create: {
                    user_id: userId,
                },
            },
        },
    });

    const imageQuery = await prisma.imageQuery.create({
        data: {
            user_id: userId,
            query_detail_id: queryDetail.id,
        },
    });

    // TODO: Should we await for this?
    await prisma.userImage.createMany({
        data: userImageFilePaths.map(filePath => {
            return {
                image_query_id: imageQuery.id,
                file_path: filePath,
            };
        }),
    });

    return [queryDetail, imageQuery];
}