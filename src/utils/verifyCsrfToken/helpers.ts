import { FRONTEND_SECRET } from "@/env";
import { createVerifier } from "fast-jwt";
import { CSRF_TOKEN_EXPIRATION_TIME_IN_SECONDS, CSRF_TOKEN_JWT_ALGORITHM } from "./config";
import { InvalidCsrfTokenError } from "./errors";
import { type RedisClientType } from "redis";

const verifyCsrfJwt = createVerifier({
    key: FRONTEND_SECRET,
    algorithms: [CSRF_TOKEN_JWT_ALGORITHM],
});

export function verifyCsrfTokenAndReturnPayload(csrfToken: Readonly<string>): any {
    if (!csrfToken) {
        throw new InvalidCsrfTokenError('no token');
    }

    let csrfTokenPayload: string;
    try {
        csrfTokenPayload = verifyCsrfJwt(csrfToken);
    } catch (e) {
        throw new InvalidCsrfTokenError('invalid token format');
    }

    if (typeof csrfTokenPayload !== 'object') throw new InvalidCsrfTokenError("payload is not an object");
    return csrfTokenPayload;
}

export function checkPayloadValidityAndGetMemoKey(csrfTokenPayload: Readonly<any>): string {
    const { exp, iat, nonce, ip } = csrfTokenPayload;

    if (!(typeof exp === 'number' && exp > Math.floor(Date.now() / 1000))) throw new InvalidCsrfTokenError('invalid exp');

    if (!(typeof iat === 'number')) throw new InvalidCsrfTokenError('invalid iat');

    if (!(exp - iat === CSRF_TOKEN_EXPIRATION_TIME_IN_SECONDS)) throw new InvalidCsrfTokenError('invalid token validity duration');

    if (!(typeof nonce === 'string' && nonce.length > 0)) throw new InvalidCsrfTokenError('invalid nonce');

    if (!(typeof ip === 'string' && ip.length > 0)) throw new InvalidCsrfTokenError('invalid ip');

    return `csrf${nonce}+${ip}+${exp}`;
}

export async function checkMemoKeyUniquenessAndSaveMemoKeyIfNecessary({ redis, memoKey } : {
    redis: RedisClientType<any, any, any>,
    memoKey: string,
}): Promise<void> {
    const memoKeyExists: boolean = (0 < await redis.exists(memoKey));
    if (memoKeyExists) {
        throw new InvalidCsrfTokenError('duplicate memo key');
    }

    /*await*/ redis.set(memoKey, 1, {
        EX: CSRF_TOKEN_EXPIRATION_TIME_IN_SECONDS - 1,
    }).then(x => x);
}
