import { DepartmentResponse } from "@/types/DepartmentResponse";
import { PrismaClient } from "@prisma/client";
import { DepartmentNotFoundError } from "./errors";
import { getDivisionFullAddress } from "@/utils/getDivisionFullAddress";

export async function getDepartmentById({ prisma, departmentId } : {
    prisma: PrismaClient,
    departmentId: number,
}): Promise<DepartmentResponse> {
    const department = await prisma.department.findUnique({
        where: {
            id: departmentId,
        },
        include: {
            hospital: {
                include: {
                    division: true,
                },
            },
        },
    });

    if (null === department) {
        throw new DepartmentNotFoundError(departmentId);
    }

    return {
        id: department.id,
        name: department.name,
        specific_address: department.specific_address,
        hospital: {
            id: department.hospital.id,
            name: department.hospital.name,
            full_address: await getDivisionFullAddress({
                prisma, divisionId: department.hospital.division_id,
            }),
        },
    };
}
