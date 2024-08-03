import { TUserWithAccountResponse } from "@/types/UserWithAccountResponse";
import { Type, type Static } from "@sinclair/typebox";

export const TResponseBody = TUserWithAccountResponse;

export type ResponseBody = Static<typeof TResponseBody>;
