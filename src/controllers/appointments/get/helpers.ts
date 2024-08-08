import { getQueryDetailWithFullQueryData } from "@/controllers/queries/helpers";
import { AppointmentResponse } from "@/types/AppointmentResponse";
import { getDivisionFullAddress } from "@/utils/getDivisionFullAddress";
import { PrismaClient } from "@prisma/client";
import { AppointmentNotFoundError } from "./errors";

export async function getAllAppointments({ prisma, userId } : {
    prisma: PrismaClient,
    userId: number,
}): Promise<AppointmentResponse[]> {
    const appointments = await prisma.appointment.findMany({
        where: {
            user_id: userId,
        },
        select: {
            id: true,
        },
        orderBy: {
            created_at: 'desc',
        },
    });

    return await Promise.all(
        appointments.map(a => getOneAppointmentById({ prisma, userId, appointmentId: a.id })),
    );
}

export async function getOneAppointmentById({ prisma, userId, appointmentId } : {
    prisma: PrismaClient,
    userId: number,
    appointmentId: number,
}): Promise<AppointmentResponse> {
    const appointment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId,
            user_id: userId,
        },
        include: {
            department: {
                include: {
                    hospital: true,
                },
            },
            query_detail: {
                include: {
                    query_results: true,
                },
            },
        }
    });

    if (null === appointment) {
        throw new AppointmentNotFoundError(appointmentId);
    }

    const [hospitalFullAddress, queryResponse] = await Promise.all([
        getDivisionFullAddress({
            prisma,
            divisionId: appointment.department.hospital.division_id,
        }),

        getQueryDetailWithFullQueryData({
            prisma,
            queryDetailWithResults: appointment.query_detail,
        }),
    ]);

    return {
        id: appointment.id,
        user_id: appointment.user_id,
        created_at: +appointment.created_at,
        scheduled_at: +appointment.scheduled_at,

        department: {
            id: appointment.department.id,
            name: appointment.department.name,
            specific_address: appointment.department.specific_address,
            hospital: {
                id: appointment.department.hospital.id,
                name: appointment.department.hospital.name,
                full_address: hospitalFullAddress,
            },
        },
        
        query_detail: queryResponse,

        note: appointment.note,
    };
}
