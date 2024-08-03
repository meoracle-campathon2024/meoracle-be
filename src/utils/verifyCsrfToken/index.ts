import { type RedisClientType } from "redis";
import { checkMemoKeyUniquenessAndSaveMemoKeyIfNecessary, checkPayloadValidityAndGetMemoKey, verifyCsrfTokenAndReturnPayload } from "./helpers";

export async function verifyCsrfToken({ redis, csrfToken }: Readonly<{
    redis: RedisClientType<any, any, any>,
    csrfToken: string,
}>) {
    const payload = verifyCsrfTokenAndReturnPayload(csrfToken);

    const memoKey = checkPayloadValidityAndGetMemoKey(payload);

    await checkMemoKeyUniquenessAndSaveMemoKeyIfNecessary({ redis, memoKey });
}
