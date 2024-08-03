import { type Static, Type } from "@sinclair/typebox";

export const TImageUploadTokenResponsePayload = Type.Object({
    token: Type.String(),
    file_id: Type.String(),
});

export type ImageUploadTokenResponse = Static<typeof TImageUploadTokenResponsePayload>;
