import { GENERAL_SECRET } from "@/env";
import { ACCESS_TOKEN_JWT_ALGORITHM } from "./config";
import { createSigner, createVerifier } from "fast-jwt";
import { InvalidAccessTokenError } from "./errors";

const verifyAccessTokenJwt = createVerifier({
    key: GENERAL_SECRET,
    algorithms: [ACCESS_TOKEN_JWT_ALGORITHM],
});

const signAccessTokenJwt = createSigner({
    key: GENERAL_SECRET,
    algorithm: ACCESS_TOKEN_JWT_ALGORITHM,
    noTimestamp: false,
});

export function issueAccessTokenForUserWithId(userId: number): string {
    return signAccessTokenJwt({
        u: userId,
    });
}

export function verifyAccessTokenAndReturnUserId(accessToken: string): number {
    let rawPayload: any;
    try {
        rawPayload = verifyAccessTokenJwt(accessToken);
    } catch (e) {
        throw new InvalidAccessTokenError('invalid token format');
    }

    if (typeof rawPayload !== 'object') {
        throw new InvalidAccessTokenError('payload is not an object');
    }

    const { u } = rawPayload;
    if (typeof u !== 'number') {
        throw new InvalidAccessTokenError('invalid payload');
    }

    return u;
}
