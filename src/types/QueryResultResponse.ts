import { Static, Type } from "@sinclair/typebox";

export const TQueryResultResponse = Type.Object({
    id: Type.Number(),
    created_at: Type.Number(),
    disease_name: Type.String(),
    priority: Type.Number(),
});

export type QueryResultResponse = Static<typeof TQueryResultResponse>;
