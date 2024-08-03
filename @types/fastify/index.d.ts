// https://github.com/fastify/fastify/issues/1417#issuecomment-458601746

import { type UserWithAccount } from "@/types/UserWithAccount";
import { type PrismaClient } from "@prisma/client";
import { Storage, Bucket } from "@google-cloud/storage";
import { type IncomingMessage, type Server, type ServerResponse } from "http";
import { type RedisClientType } from "redis";

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse,
    > {
        prisma: PrismaClient;
        redis: RedisClientType<any, any, any>;
        firebaseStorage: Storage;
        firebaseStorageBucket: Bucket;
    }

    export interface FastifyRequest {
        user: UserWithAccount,
    }
}
