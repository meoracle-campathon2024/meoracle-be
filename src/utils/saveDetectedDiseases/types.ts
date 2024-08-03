import { Static, Type } from "@sinclair/typebox";

export const TDiseaseDetected = Type.Object({
    name: Type.String(),
    category_id: Type.Number(),
});

export const TListOfDiseasesDetected = Type.Array(TDiseaseDetected);

export type ListOfDiseasesDetected = Static<typeof TListOfDiseasesDetected>;
