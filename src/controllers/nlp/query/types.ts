import { TQueryResultListResponse } from "@/types/QueryResultListResponse";
import { type Static, Type } from "@sinclair/typebox";

export const TNlpQueryRequestPayload = Type.Object({
    query_content: Type.String(),
});

export type NlpQueryRequestPayload = Static<typeof TNlpQueryRequestPayload>;

export const TNlpQueryResponsePayload = TQueryResultListResponse;

export type NlpQueryResponsePayload = Static<typeof TNlpQueryResponsePayload>;
