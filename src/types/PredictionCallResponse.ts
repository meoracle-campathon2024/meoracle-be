import { Static, Type } from "@sinclair/typebox";
import { TQueryResultListResponse } from "./QueryResultListResponse";

export const TPredictionCallResponse = Type.Object({
    query_detail: Type.Object({
        id: Type.Number(),
        created_at: Type.Number(),
    }),
    detected_diseases: TQueryResultListResponse,
});

export type PredictionCallResponse = Static<typeof TPredictionCallResponse>;
