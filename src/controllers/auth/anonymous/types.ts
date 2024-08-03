import { TUserWithAccountResponse } from "@/types/UserWithAccountResponse";
import { Static } from "@sinclair/typebox";

export const TAuthResponse = TUserWithAccountResponse;

export type AuthResponse = Static<typeof TAuthResponse>;
