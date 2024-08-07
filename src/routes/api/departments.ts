import { c_GET_departments_by_id } from "@/controllers/departments/getById";
import { TGetDepartmentByIdRequestQuerystring, TGetDepartmentByIdResponsePayload } from "@/controllers/departments/getById/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_departments(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/', {
        schema: {
            querystring: TGetDepartmentByIdRequestQuerystring,
            response: {
                200: TGetDepartmentByIdResponsePayload,
            },
        },
    }, c_GET_departments_by_id);
}
