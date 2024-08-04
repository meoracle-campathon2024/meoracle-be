import { Static, Type } from "@sinclair/typebox";
import { TQueryResultListResponse } from "./QueryResultListResponse";

export const TQueryResponse = Type.Intersect([
    Type.Object({
        id: Type.Number(),
        created_at: Type.Number(),
        results: TQueryResultListResponse,
    }),

    Type.Union([
        Type.Object({
            model_name: Type.Literal('nlp'),
            query_content: Type.String(),
        }),

        Type.Object({
            model_name: Type.Literal('classification'),
            selected_symptoms: Type.Array(Type.Object({
                id: Type.Number(),
                name: Type.String(),
            })),
        }),

        Type.Object({
            model_name: Type.Literal('image'),
            uploaded_images: Type.Array(Type.Object({
                file_path: Type.String(),
            })),
        }),
    ]),
]);

export type QueryResponse = Static<typeof TQueryResponse>;
