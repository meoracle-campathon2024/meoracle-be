import { PrismaClient } from "@prisma/client"
import { DivisionCorruptError, NoSuchDivisionError } from "./errors";

export async function getDivisionFullAddress({ prisma, divisionId } : {
    prisma: PrismaClient,
    divisionId: number,
}): Promise<string> {
    const addressChain = await getDivisionNameChain({
        prisma,
        leafDivisionId: divisionId,
    });

    return addressChain.join(', ');
}

async function getDivisionNameChain({ prisma, leafDivisionId, expectedLevelOfLeafDivision } : {
    prisma: PrismaClient,
    leafDivisionId: number,
    expectedLevelOfLeafDivision?: number|undefined,
}): Promise<string[]> {
    const leafDivision = await prisma.division.findUnique({
        where: {
            id: leafDivisionId,
        },
        include: {
            division_type: true,
        },
    });

    if (null === leafDivision) {
        throw new NoSuchDivisionError("" + leafDivisionId);
    }

    if (undefined !== expectedLevelOfLeafDivision && expectedLevelOfLeafDivision !== leafDivision.division_type.level) {
        throw new DivisionCorruptError("" + leafDivisionId);
    }

    const isTopLevel = (leafDivision.division_type.level === 0);
    const hasNoParent = (leafDivision.parent_id === null);
    if (isTopLevel !== hasNoParent) {
        throw new DivisionCorruptError("" + leafDivisionId);
    }

    //  Problem with TypeScript type inference
    //  vvvvvvvvvvvvvvv
    if (/*hasNoParent*/leafDivision.parent_id === null) {
        return [leafDivision.name];
    }

    const chain = await getDivisionNameChain({
        prisma,
        leafDivisionId: leafDivision.parent_id,
        expectedLevelOfLeafDivision: leafDivision.division_type.level - 1,
    });

    return [leafDivision.name, ...chain];
}
