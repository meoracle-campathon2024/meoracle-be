import { DEBUG } from "@/env";
import { ClassificationSymptomGroupWithChildren } from "@/types/ClassificationSymptomGroupsWithChildren";
import createError from "@fastify/error";
import { PrismaClient } from "@prisma/client";
import { InvalidInternalDataError } from "./errors";

export async function getClassificationSymptomGroups({ prisma } : {
    prisma: PrismaClient,
}): Promise<ClassificationSymptomGroupWithChildren[]> {
    const allGroupsById = new Map<number, ClassificationSymptomGroupWithChildren>();

    const allGroupsFromDb = await prisma.classificationSymptomGroup.findMany({
        include: {
            classification_symptoms: true,
        },
    });

    const allGroups: ClassificationSymptomGroupWithChildren[] = allGroupsFromDb.map(g => {
        const group = {
            ...g,
            symptoms: g.classification_symptoms,
            subgroups: [],
        };
        delete (group as any).classification_symptoms;

        allGroupsById.set(group.id, group);

        return group;
    });

    const results: ClassificationSymptomGroupWithChildren[] = [];
    for (const group of allGroups) {
        if (group.tier === 0) {
            // ROOT
            if (group.parent_id !== null) {
                throw InvalidInternalDataError(`group with ID=${group.id} has tier == 0 but has a parent`);
            }
            results.push(group);
        } else {
            if (group.parent_id === null) {
                throw InvalidInternalDataError(`group with ID=${group.id} has tier != 0 but has no parent`);
            }
            const parentGroup = allGroupsById.get(group.parent_id);
            if (undefined === parentGroup) {
                throw InvalidInternalDataError(`group with ID=${group.id} has inexistent parent`);
            }

            if (parentGroup.tier + 1 !== group.tier) {
                throw InvalidInternalDataError(`group with ID=${group.id};tier=${group.tier} and/or its parent with ID=${parentGroup.id};tier=${parentGroup.tier} have wrong tier numbers`);
            }

            parentGroup.subgroups.push(group);
        }
    }

    return results;
}
