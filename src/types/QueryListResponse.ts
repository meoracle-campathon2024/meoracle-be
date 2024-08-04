import { Static, Type } from "@sinclair/typebox";
import { TQueryResponse } from "./QueryResponse";

export const TQueryListResponse = Type.Array(TQueryResponse);

export type QueryListResponse = Static<typeof TQueryListResponse>;
