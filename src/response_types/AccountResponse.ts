import { Type, type Static } from "@sinclair/typebox"
import { TCountryResponse } from "./CountryResponse"

export const TAccountResponse =Type.Object({
    email: Type.String(),
    name: Type.String(),
    date_of_birth: Type.String(), // dobNumber = new Date().getTime() ; dobDate = new Date(dobNumber);
    country: TCountryResponse,
    national_identity_number: Type.String(),
});

export type AccountResponse = Static<typeof TAccountResponse>;
