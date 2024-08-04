import { TQueryListResponse } from "@/types/QueryListResponse";
import { Static } from "@sinclair/typebox";

export const TGetQueriesResponsePayload = TQueryListResponse;
export type GetQueriesResponsePayload = Static<typeof TGetQueriesResponsePayload>;
