import { c_POST_appointments } from "@/controllers/appointments/create";
import { TCreateAppointmentRequestPayload, TCreateAppointmentResponsePayload } from "@/controllers/appointments/create/types";
import { c_GET_appointments } from "@/controllers/appointments/get";
import { TGetAppointmentsRequestQuerystring, TGetAppointmentsResponsePayload } from "@/controllers/appointments/get/types";
import { c_GET_appointments_suggestions } from "@/controllers/appointments/suggestions";
import { TSuggestionsQuerystring, TSuggestionsResponsePayload } from "@/controllers/appointments/suggestions/types";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_appointments(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/suggestions', {
        schema: {
            querystring: TSuggestionsQuerystring,
            response: {
                200: TSuggestionsResponsePayload,
            },
        },
    }, c_GET_appointments_suggestions);

    server.post('/', {
        schema: {
            body: TCreateAppointmentRequestPayload,
            response: {
                200: TCreateAppointmentResponsePayload,
            },
        },
    }, c_POST_appointments);

    server.get('/', {
        schema: {
            querystring: TGetAppointmentsRequestQuerystring,
            response: {
                200: TGetAppointmentsResponsePayload,
            },
        },
    }, c_GET_appointments);
}
