import { TDepartmentResponse } from "@/types/DepartmentResponse";
import { Static, Type } from "@sinclair/typebox";

export const TSuggestionsQuerystring = Type.Object({
    query_detail_id: Type.Number(),
    lat: Type.Optional(Type.Number()),
    lon: Type.Optional(Type.Number()),
});

export type SuggestionsQuerystring = Static<typeof TSuggestionsQuerystring>;

export const TSuggestionsResponsePayload = Type.Array(TDepartmentResponse);

export type SuggestionsResponsePayload = Static<typeof TSuggestionsResponsePayload>;
