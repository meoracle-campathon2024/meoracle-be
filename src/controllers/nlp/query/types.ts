import { TPredictionCallResponse } from "@/types/PredictionCallResponse";
import { type Static, Type } from "@sinclair/typebox";

export const TNlpQueryRequestPayload = Type.Object({
    query_content: Type.String(),
});

export type NlpQueryRequestPayload = Static<typeof TNlpQueryRequestPayload>;

export const TNlpQueryResponsePayload = TPredictionCallResponse;

export type NlpQueryResponsePayload = Static<typeof TNlpQueryResponsePayload>;
