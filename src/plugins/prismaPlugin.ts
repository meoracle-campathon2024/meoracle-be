import { type FastifyInstance, type FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { PrismaClient } from "@prisma/client";

// Credit:
// https://github.com/danielm/fastify-prisma-swagger-rest-boilerplate/blob/main/src/plugins/prisma.plugin.ts

/**
 * This plugin can be registered at any time before the server is listening.
 */
export const prismaPlugin: FastifyPluginAsync = fastifyPlugin(async (server: FastifyInstance) => {
    const prisma = new PrismaClient();

    server.decorate('prisma', prisma);

    server.addHook('onClose', async server => {
        await server.prisma.$disconnect();
    });
});
