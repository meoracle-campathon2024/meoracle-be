import { Division, DivisionType, PrismaClient } from "@prisma/client";

export type DivisionResponseWithChildren = Division & {
    division_type: DivisionType,
    children: DivisionResponseWithChildren[],
};

export async function getAllDivisionsOfCountry({ prisma, countryId } : {
    prisma: PrismaClient,
    countryId: number,
}): Promise<DivisionResponseWithChildren[]> {
    const country = await prisma.country.findFirst({
        where: {
            id: countryId,
        },
        include: {
            division_types: true,
        },
    });

    if (!country) return [];

    const divisionsById = new Map<number, DivisionResponseWithChildren>();

    const divisions = await prisma.division.findMany({
        where: {
            division_type: {
                OR: country.division_types.map(division_type => {
                    return {
                        level: division_type.level,
                    };
                }),
            },
        },
        include: {
            division_type: true,
        }
    });

    divisions.forEach(division => {
        divisionsById.set(division.id, {
            ...division,
            division_type: division.division_type,
            children: [],
        });
    });

    const topLevelDivisionTypeIds = new Set<number>(
        country.division_types.map(t => t.id),
    );

    const results: DivisionResponseWithChildren[] = [];
    for (const [divisionId, division] of divisionsById) {
        const parentDivisionId = division.parent_id;
        if (null !== parentDivisionId) {
            const parentDivision = divisionsById.get(parentDivisionId);
            if (undefined === parentDivision) continue;
            if (parentDivision.division_type.level + 1 !== division.division_type.level) continue;

            parentDivision.children.push(division);
        } else {
            // Top level division
            if (division.division_type.level !== 0) continue;
            if (topLevelDivisionTypeIds.has(division.id)) {
                results.push(division);
            }
        }
    }

    return results;
}
