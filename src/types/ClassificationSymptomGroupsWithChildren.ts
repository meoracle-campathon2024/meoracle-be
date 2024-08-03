import { ClassificationSymptom, ClassificationSymptomGroup } from "@prisma/client";

export type ClassificationSymptomGroupWithChildren = ClassificationSymptomGroup & {
    symptoms: ClassificationSymptom[],
    subgroups: ClassificationSymptomGroupWithChildren[],
};
