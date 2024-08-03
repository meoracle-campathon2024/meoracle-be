import { REDIS_URL } from "@/env";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { createClient, RedisClientType } from "redis";

/**
 * This plugin can be registered at any time before the server is listening.
 */
export const redisPlugin: FastifyPluginAsync = fastifyPlugin(async (server: FastifyInstance) => {
    try {
        const redis: RedisClientType<any, any, any> = await new Promise((resolve, reject) => {
            createClient({
                url: REDIS_URL,
            })
            .on('error', err => reject(err))
            .connect()
            .then(client => resolve(client))
            .catch(err => reject(err));
        });

        server.decorate('redis', redis);

        server.addHook('onClose', async (server) => {
            await server.redis.disconnect();
        });
    } catch (err) {
        console.error(`Redis Error: ${err}`);
        throw err;
    }
});
