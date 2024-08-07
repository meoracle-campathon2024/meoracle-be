import { FastifyReply, FastifyRequest } from "fastify";
import { ImageModelQueryRequestPayload, ImageModelQueryResponsePayload, TImageModelQueryResponsePayload } from "./types";
import { saveImageModelQueryInfo } from "./helpers/data";
import { callImageQueryModel } from "./helpers/model";
import { saveDetectedDiseases } from "@/utils/saveDetectedDiseases";

export async function c_POST_image_model_query(
    req: FastifyRequest<{ Body: ImageModelQueryRequestPayload }>,
    res: FastifyReply,
): Promise<ImageModelQueryResponsePayload> {
    const imageLinks = req.body.uploaded_file_paths;
    const { firebaseStorageBucket, prisma } = req.server;

    const [diseasesDetected, [queryDetail]] = await Promise.all([
        callImageQueryModel({ imageLinks }),

        saveImageModelQueryInfo({
            prisma,
            userId: req.user.id,
            userImageFilePaths: imageLinks,
        }),
    ]);

    const queryResults = await saveDetectedDiseases({
        prisma,
        diseasesDetected,
        queryDetailId: queryDetail.id,
    });

    return {
        query_detail: {
            id: queryDetail.id,
            created_at: +queryDetail.created_at,
        },
        detected_diseases: queryResults.map(qr => {
            return {
                id: qr.id,
                disease_name: qr.disease_name,
                created_at: +qr.created_at,
                priority: qr.priority,
            };
        }),
    };
}
