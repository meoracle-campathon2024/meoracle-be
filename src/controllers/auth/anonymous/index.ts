import { FastifyReply, FastifyRequest } from "fastify";
import { createAnonymousUser } from "./helpers";
import { TUserWithAccountResponse } from "@/types/UserWithAccountResponse";
import { Value } from "@sinclair/typebox/value";
import { issueAccessToken, verifyAccessToken } from "@/utils/accessTokenAuthority";
import { getAccessTokenFromCookie, setAccessTokenAsCookie } from "@/utils/accessTokenCookieIO";
import { UserWithAccount } from "@/types/UserWithAccount";
import { InvalidAccessTokenError } from "@/utils/accessTokenAuthority/errors";
import { AuthResponse } from "./types";

export async function c_GET_api_auth_anonymous(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<AuthResponse> {
    const prisma = req.server.prisma;

    let accessToken = getAccessTokenFromCookie(req);
    let user: UserWithAccount;

    try {
        user = await verifyAccessToken({ prisma, accessToken });
    } catch (e) {
        if (!(e instanceof InvalidAccessTokenError)) throw e;
        user = await createAnonymousUser({ prisma });
        accessToken = issueAccessToken({ user });
    }

    setAccessTokenAsCookie({
        res, accessToken,
    });

    return Value.Cast(TUserWithAccountResponse, user);
}
