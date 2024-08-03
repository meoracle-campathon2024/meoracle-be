import { Account, PrismaClient, User } from "@prisma/client";
import { issueAccessTokenForUserWithId, verifyAccessTokenAndReturnUserId } from "./helpers";
import { InvalidAccessTokenError } from "./errors";
import { UserWithAccount } from "@/types/UserWithAccount";

export function issueAccessToken({ user } : {
    user: User,
}): string {
    return issueAccessTokenForUserWithId(user.id);
}

export async function verifyAccessToken({ prisma, accessToken } : {
    prisma: PrismaClient,
    accessToken: string,
}): Promise<UserWithAccount> {
    const userId = verifyAccessTokenAndReturnUserId(accessToken);

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            account: true,
        },
    });

    if (user === null) throw new InvalidAccessTokenError('no such user');

    return user;
}
