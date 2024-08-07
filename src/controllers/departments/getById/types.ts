import { TDepartmentResponse } from "@/types/DepartmentResponse";
import { Static, Type } from "@sinclair/typebox";

export const TGetDepartmentByIdRequestQuerystring = Type.Object({
    department_id: Type.Number(),
});

export type GetDepartmentByIdRequestQuerystring = Static<typeof TGetDepartmentByIdRequestQuerystring>;

export const TGetDepartmentByIdResponsePayload = Type.Array(TDepartmentResponse);

export type GetDepartmentByIdResponsePayload = Static<typeof TGetDepartmentByIdResponsePayload>;
