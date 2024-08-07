import { Appointment, PrismaClient } from "@prisma/client";

export async function createAppointment({ prisma, userId, departmentId, queryDetailId, note } : {
    prisma: PrismaClient,
    userId: number,
    departmentId: number,
    queryDetailId: number,
    note: string,
}): Promise<Appointment> {
    const scheduled_at = new Date();
    scheduled_at.setDate(scheduled_at.getDate() + 6); // TODO

    const appointment = await prisma.appointment.create({
        data: {
            user_id: userId,
            created_at: new Date(),
            scheduled_at,
            department_id: departmentId,
            query_detail_id: queryDetailId,
            note,
        },
    });

    return appointment;
}
