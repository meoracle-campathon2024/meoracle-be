import { type UserWithAccount } from "@/types/UserWithAccount";
import { PrismaClient } from "@prisma/client";

export async function createAnonymousUser({ prisma } : {
    prisma: PrismaClient,
}): Promise<UserWithAccount> {
    const user = await prisma.user.create({
        data: {
            account_id: null,
        },
        include: {
            account: true,
        }
    });

    return user;
}
