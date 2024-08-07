import { TQueryListResponse } from "@/types/QueryListResponse";
import { Static, Type } from "@sinclair/typebox";

export const TGetQueriesRequestQuerystring = Type.Object({
    query_detail_id: Type.Optional(Type.Number()),
});

export type GetQueriesRequestQuerystring = Static<typeof TGetQueriesRequestQuerystring>;

export const TGetQueriesResponsePayload = TQueryListResponse;
export type GetQueriesResponsePayload = Static<typeof TGetQueriesResponsePayload>;
