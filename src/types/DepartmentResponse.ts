import { Static, Type } from "@sinclair/typebox";
import { THospitalResponse } from "./HospitalResponse";

export const TDepartmentResponse = Type.Object({
    id: Type.Number(),
    hospital: THospitalResponse,
    name: Type.String(),
    specific_address: Type.String(),
});

export type DepartmentResponse = Static<typeof TDepartmentResponse>;
