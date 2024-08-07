import { TPredictionCallResponse } from "@/types/PredictionCallResponse";
import { type Static, Type } from "@sinclair/typebox";

export const TClassificationQueryRequestPayload = Type.Object({
    selected_classification_symptom_ids: Type.Array(Type.Number()),
});

export type ClassificationQueryRequestPayload = Static<typeof TClassificationQueryRequestPayload>;

export const TClassificationQueryResponsePayload = TPredictionCallResponse;

export type ClassificationQueryResponsePayload = Static<typeof TClassificationQueryResponsePayload>;
