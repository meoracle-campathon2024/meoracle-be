import { FastifyReply, FastifyRequest } from "fastify";
import { createAnonymousUser } from "./helpers";
import { TUserWithAccountResponse, UserWithAccountResponse } from "@/response_types/UserWithAccountResponse";
import { Value } from "@sinclair/typebox/value";
import { verifyAccessToken } from "@/utils/accessTokenAuthority";
import { getAccessTokenFromCookie } from "@/utils/accessTokenCookieIO";
import { UserWithAccount } from "@/types/UserWithAccount";
import { InvalidAccessTokenError } from "@/utils/accessTokenAuthority/errors";

export async function c_api_auth_anonymous(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<UserWithAccountResponse> {
    const prisma = req.server.prisma;

    const accessToken = getAccessTokenFromCookie(req);

    let user: UserWithAccount;

    try {
        user = await verifyAccessToken({ prisma, accessToken });
    } catch (e) {
        if (!(e instanceof InvalidAccessTokenError)) throw e;

        user = await createAnonymousUser({ prisma });
    }

    return Value.Cast(TUserWithAccountResponse, user);
}
