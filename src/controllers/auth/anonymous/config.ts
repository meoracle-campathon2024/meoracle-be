import { TUserWithAccountResponse } from "@/response_types/UserWithAccountResponse";
import { Type, type Static } from "@sinclair/typebox";

export const TResponseBody = TUserWithAccountResponse;

export type ResponseBody = Static<typeof TResponseBody>;
