import { FastifyReply, FastifyRequest } from "fastify";
import { GetDepartmentByIdRequestQuerystring, GetDepartmentByIdResponsePayload } from "./types";
import { getDepartmentById } from "./helpers";

export async function c_GET_departments_by_id(
    req: FastifyRequest<{Querystring: GetDepartmentByIdRequestQuerystring}>,
    res: FastifyReply,
): Promise<GetDepartmentByIdResponsePayload> {
    const department = await getDepartmentById({
        prisma: req.server.prisma,
        departmentId: req.query.department_id,
    });

    return [department];
}
