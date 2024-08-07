import { TPredictionCallResponse } from "@/types/PredictionCallResponse";
import { Static, Type } from "@sinclair/typebox";

export const TImageModelQueryRequestPayload = Type.Object({
    uploaded_file_paths: Type.Array(Type.String()),
});

export type ImageModelQueryRequestPayload = Static<typeof TImageModelQueryRequestPayload>;

export const TImageModelQueryResponsePayload = TPredictionCallResponse;

export type ImageModelQueryResponsePayload = Static<typeof TImageModelQueryResponsePayload>;
