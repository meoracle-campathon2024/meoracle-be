import { Static, Type } from "@sinclair/typebox";
import { TDepartmentResponse } from "./DepartmentResponse";
import { TQueryResponse } from "./QueryResponse";

export const TAppointmentResponse = Type.Object({
    id: Type.Number(),
    user_id: Type.Number(),
    created_at: Type.Number(),
    scheduled_at: Type.Number(),
    department: TDepartmentResponse,
    query_detail: TQueryResponse,
    note: Type.String(),
});

export type AppointmentResponse = Static<typeof TAppointmentResponse>;
