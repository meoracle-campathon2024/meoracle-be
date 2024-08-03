import { type Account, type User } from "@prisma/client";

export type UserWithAccount = User & {
    account: Account | null,
}
