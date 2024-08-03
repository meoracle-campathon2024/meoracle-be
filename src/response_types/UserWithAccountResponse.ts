import { Type, type Static } from "@sinclair/typebox";

export const TUserWithAccountResponse = Type.Intersect([
    Type.Object({
        id: Type.Number(),
    }),

    Type.Union([
        Type.Object({
            account: Type.Null(),
        }),
    
        Type.Object({
            account: Type.Object({
                email: Type.String(),
                name: Type.String(),
                date_of_birth: Type.String(), // dobNumber = new Date().getTime() ; dobDate = new Date(dobNumber);
                country_id: Type.Number(),
            }),
        }),
    ]),
]);

export type UserWithAccountResponse = Static<typeof TUserWithAccountResponse>;
