import { TQueryResultListResponse } from "@/types/QueryResultListResponse";
import { Static, Type } from "@sinclair/typebox";

export const TImageModelQueryRequestPayload = Type.Object({
    uploaded_file_paths: Type.Array(Type.String()),
});

export type ImageModelQueryRequestPayload = Static<typeof TImageModelQueryRequestPayload>;

export const TImageModelQueryResponsePayload = TQueryResultListResponse;

export type ImageModelQueryResponsePayload = Static<typeof TImageModelQueryResponsePayload>;
