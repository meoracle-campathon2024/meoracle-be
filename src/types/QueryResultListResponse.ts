import { Static, Type } from "@sinclair/typebox";
import { TQueryResultResponse } from "./QueryResultResponse";

export const TQueryResultListResponse = Type.Array(TQueryResultResponse);

export type QueryResultListResponse = Static<typeof TQueryResultListResponse>;
