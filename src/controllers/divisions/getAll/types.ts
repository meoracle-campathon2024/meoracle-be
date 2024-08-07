import { Static, Type } from "@sinclair/typebox";
import { DivisionResponseWithChildren } from "../helpers";

export const TDivisionListRequestQuerystring = Type.Object({
    country_id: Type.Number(),
});

export type DivisionListRequestQuerystring = Static<typeof TDivisionListRequestQuerystring>;

export type DivisionListResponse = DivisionResponseWithChildren[];
