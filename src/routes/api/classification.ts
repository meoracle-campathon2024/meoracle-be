import { c_GET_classification_symptom_groups } from "@/controllers/classification/symptom_groups";
import { anyAuth } from "@/middleware/anyAuth";
import { FastifyInstance } from "fastify";

export async function r_api_classification(server: FastifyInstance) {
    server.addHook('onRequest', anyAuth);

    server.get('/symptom-groups', c_GET_classification_symptom_groups);
}
