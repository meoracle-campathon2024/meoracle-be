import { Type, type Static } from "@sinclair/typebox"

export const TCountryResponse = Type.Object({
    id: Type.Number(),
    code: Type.String(),
    short_name: Type.String(),
    full_name: Type.String(),
});

export type CountryResponse = Static<typeof TCountryResponse>; 
