import { Static, Type } from "@sinclair/typebox";

export const THospitalResponse = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    full_address: Type.String(),
});

export type HospitalResponse = Static<typeof THospitalResponse>;
