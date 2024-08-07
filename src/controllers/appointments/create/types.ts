import { Static, Type } from "@sinclair/typebox";

export const TCreateAppointmentRequestPayload = Type.Object({
    department_id: Type.Number(),
    query_detail_id: Type.Number(),
    note: Type.String(),
});

export type CreateAppointmentRequestPayload = Static<typeof TCreateAppointmentRequestPayload>;

export const TCreateAppointmentResponsePayload = Type.Object({
    id: Type.Number(),
    created_at: Type.Number(),
    department_id: Type.Number(),
    query_detail_id: Type.Number(),
    note: Type.String(),
});

export type CreateAppointmentResponsePayload = Static<typeof TCreateAppointmentResponsePayload>;
