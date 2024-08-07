import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAppointmentRequestPayload, CreateAppointmentResponsePayload } from "./types";
import { createAppointment } from "./helpers";

export async function c_POST_appointments(
    req: FastifyRequest<{Body: CreateAppointmentRequestPayload}>,
    res: FastifyReply,
): Promise<CreateAppointmentResponsePayload> {
    const appointment = await createAppointment({
        prisma: req.server.prisma,
        userId: req.user.id,
        departmentId: req.body.department_id,
        queryDetailId: req.body.query_detail_id,
        note: req.body.note,
    });

    return {
        id: appointment.id,
        created_at: +appointment.created_at,
        department_id: appointment.department_id,
        query_detail_id: appointment.query_detail_id,
        note: appointment.note,
    };
}
