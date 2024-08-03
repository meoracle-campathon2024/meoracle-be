import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { FRONTEND_URLS } from "./env";
import { allRoutes } from "./routes";
import { CSRF_TOKEN_HEADER_NAME } from "./config";
import { prismaPlugin } from "./plugins/prismaPlugin";
import { redisPlugin } from "./plugins/redisPlugin";
import { firebaseStoragePlugin } from "./plugins/firebaseStoragePlugin";

export async function createServer() {
    // https://fastify.dev/docs/latest/Reference/TypeScript/#typebox
    // We use typebox for building types and schemas
    // for Fastify Request and Reply objects.
    const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

    const pluginInitializationPromises = [
        server.register(fastifyCors, {
            origin: FRONTEND_URLS,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: [
                'Cookie',
                'Content-Type',
                'Content-Encoding',
                'Content-Language',
                'Content-Length',
                'Cache-Control',
                'Accept',
                'Accept-Language',
                CSRF_TOKEN_HEADER_NAME,
            ],
            credentials: true,
        }),

        server.register(fastifyCookie),

        server.register(prismaPlugin),

        server.register(redisPlugin),

        server.register(firebaseStoragePlugin),
    ];

    await Promise.all(pluginInitializationPromises);

    await server.register(allRoutes, { prefix: '/' });

    return server;
}
