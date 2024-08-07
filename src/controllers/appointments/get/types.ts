import { TAppointmentResponse } from "@/types/AppointmentResponse";
import { Static, Type } from "@sinclair/typebox";

export const TGetAppointmentsRequestQuerystring = Type.Object({
    appointment_id: Type.Optional(Type.Number()),
});

export type GetAppointmentsRequestQuerystring = Static<typeof TGetAppointmentsRequestQuerystring>;

export const TGetAppointmentsResponsePayload = Type.Array(TAppointmentResponse);

export type GetAppointmentsResponsePayload = Static<typeof TGetAppointmentsResponsePayload>;
