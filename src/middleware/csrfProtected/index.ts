import { CSRF_TOKEN_HEADER_NAME } from "@/config";
import { FastifyReply, FastifyRequest } from "fastify";
import { checkCsrfHeader } from "./helpers";

export async function csrfProtected(
    req: FastifyRequest,
    res: FastifyReply,
): Promise<void> {
    const csrfTokenHeader = "" + req.headers[CSRF_TOKEN_HEADER_NAME];

    await checkCsrfHeader({
        redis: req.server.redis,
        csrfTokenHeader,
    });
}
