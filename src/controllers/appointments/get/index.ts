import { FastifyReply, FastifyRequest } from "fastify";
import { GetAppointmentsRequestQuerystring, GetAppointmentsResponsePayload } from "./types";
import { getAllAppointments, getOneAppointmentById } from "./helpers";

export async function c_GET_appointments(
    req: FastifyRequest<{Querystring: GetAppointmentsRequestQuerystring}>,
    res: FastifyReply,
): Promise<GetAppointmentsResponsePayload> {
    const { prisma } = req.server;
    const userId = req.user.id;
    const { appointment_id } = req.query;

    if (undefined === appointment_id) {
        return await getAllAppointments({ prisma, userId });
    } else {
        return [await getOneAppointmentById({ prisma, userId, appointmentId: appointment_id })];
    }
}
