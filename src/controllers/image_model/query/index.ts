import { FastifyReply, FastifyRequest } from "fastify";
import { ImageModelQueryRequestPayload, ImageModelQueryResponsePayload, TImageModelQueryResponsePayload } from "./types";
import { saveImageModelQueryInfo } from "./helpers/data";
import { getImageLinkByItsPathOnFirebase } from "./helpers/firebase";
import { callImageQueryModel } from "./helpers/model";
import { saveDetectedDiseases } from "@/utils/saveDetectedDiseases";
import { Value } from "@sinclair/typebox/value";

export async function c_POST_image_model_query(
    req: FastifyRequest<{ Body: ImageModelQueryRequestPayload }>,
    res: FastifyReply,
): Promise<ImageModelQueryResponsePayload> {
    const filePaths = req.body.uploaded_file_paths;
    const { firebaseStorageBucket, prisma } = req.server;

    const imageLinks = await Promise.all(filePaths.map(
        filePath => getImageLinkByItsPathOnFirebase({
            filePath, firebaseStorageBucket,
        })
    ));

    const [diseasesDetected, [queryDetail]] = await Promise.all([
        callImageQueryModel({ imageLinks }),

        saveImageModelQueryInfo({
            prisma,
            userId: req.user.id,
            userImageFilePaths: filePaths,
        }),
    ]);

    const queryResults = await saveDetectedDiseases({
        prisma,
        diseasesDetected,
        queryDetailId: queryDetail.id,
    });

    return Value.Cast(TImageModelQueryResponsePayload, queryResults);
}
