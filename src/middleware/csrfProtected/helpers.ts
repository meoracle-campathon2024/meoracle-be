import { verifyCsrfToken } from "@/utils/verifyCsrfToken";
import { PrismaClient } from "@prisma/client";
import { RedisClientType } from "redis";

export async function checkCsrfHeader({ redis, csrfTokenHeader } : {
    redis: RedisClientType<any, any, any>,
    csrfTokenHeader: string,
}): Promise<void> {
    await verifyCsrfToken({ redis, csrfToken: csrfTokenHeader });
}
