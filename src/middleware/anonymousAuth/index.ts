import { verifyAccessToken } from "@/utils/accessTokenAuthority";
import { getAccessTokenFromCookie } from "@/utils/accessTokenCookieIO";
import { FastifyReply, FastifyRequest } from "fastify";

export async function anonymousAuth(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<void> {
    const accessToken = getAccessTokenFromCookie(req);

    const user = await verifyAccessToken({
        prisma: req.server.prisma,
        accessToken,
    });

    req.user = user;
}
