import { FastifyInstance } from "fastify";

export async function allRoutes(server: FastifyInstance) {
    server.get('/whatsup', async (req, res) => {
        return 'nothing';
    });
}
