import { FastifyRequest, FastifyReply } from "fastify";
import { ImageUploadTokenResponse } from "./types";
import { createImageUploadToken } from "./helpers";

export async function c_GET_image_upload_token(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<ImageUploadTokenResponse> {
    return await createImageUploadToken({
        userId: req.user.id,
    });
}
