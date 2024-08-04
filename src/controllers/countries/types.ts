import { Static, Type } from "@sinclair/typebox";

export const TCountryResponse = Type.Object({
    id: Type.Number(),
    code: Type.String(),
    short_name: Type.String(),
    full_name: Type.String(),
});

export type CountryResponse = Static<typeof TCountryResponse>;

export const TCountryListResponse = Type.Array(TCountryResponse);

export type CountryListResponse = Static<typeof TCountryListResponse>;
