import { TQueryResultListResponse } from "@/types/QueryResultListResponse";
import { type Static, Type } from "@sinclair/typebox";

export const TClassificationQueryRequestPayload = Type.Object({
    selected_classification_symptom_ids: Type.Array(Type.Number()),
});

export type ClassificationQueryRequestPayload = Static<typeof TClassificationQueryRequestPayload>;

export const TClassificationQueryResponsePayload = TQueryResultListResponse;

export type ClassificationQueryResponsePayload = Static<typeof TClassificationQueryResponsePayload>;





export const TDiseaseDetectedByClassificationModel = Type.Object({
    name: Type.String(),
    category_id: Type.Number(),
});

export const TListOfDiseasesDetectedByClassificationModel = Type.Array(TDiseaseDetectedByClassificationModel);

export type ListOfDiseasesDetectedByClassificationModel = Static<typeof TListOfDiseasesDetectedByClassificationModel>;
