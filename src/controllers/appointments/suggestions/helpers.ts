import { DepartmentResponse } from "@/types/DepartmentResponse";
import { Department, Hospital, PrismaClient } from "@prisma/client";
import { QueryDetailNotFoundError } from "./errors";
import { getDivisionFullAddress } from "@/utils/getDivisionFullAddress";
import { HospitalResponse } from "@/types/HospitalResponse";

export async function getSuggestions({ prisma, queryDetailId, lat, lon }: {
    prisma: PrismaClient,
    queryDetailId: number,
    lat: number,
    lon: number,
}): Promise<DepartmentResponse[]> {
    const queryDetail = await prisma.queryDetail.findUnique({
        where: {
            id: queryDetailId,
        },
        include: {
            query_results: {
                include: {
                    disease_category: {
                        include: {
                            departments: {
                                include: {
                                    hospital: {
                                        include: {
                                            division: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (null === queryDetail) {
        throw new QueryDetailNotFoundError("" + queryDetailId);
    }

    const queryResults = queryDetail.query_results;

    if (queryResults.length === 0) {
        // AI model may have been broken at that time.
        return [];
    }

    const departmentsByIds = new Map<number, DepartmentResponse>();
    const hospitalsByIds = new Map<number, HospitalResponse>();

    const cacheHospital = async (hospital: Hospital): Promise<HospitalResponse> => {
        const cached = hospitalsByIds.get(hospital.id);
        if (undefined === cached) {
            const newEntry = {
                id: hospital.id,
                name: hospital.name,
                full_address: hospital.specific_address + ', ' + await getDivisionFullAddress({ prisma, divisionId: hospital.division_id }),
            };
            hospitalsByIds.set(hospital.id, newEntry);
            return newEntry;
        }

        return cached;
    };

    const cacheDepartment = async (department: Department & { hospital: Hospital }): Promise<DepartmentResponse> => {
        const cached = departmentsByIds.get(department.id);
        if (undefined === cached) {
            const newEntry = {
                id: department.id,
                name: department.name,
                specific_address: department.specific_address,
                hospital: await cacheHospital(department.hospital),
            };
            departmentsByIds.set(department.id, newEntry);
            return newEntry;
        }

        return cached;
    };

    // ALGORITHM ListDepartments:
    //     LET possibleDepartments = MAP<department, score: int>
    //     FOR EACH disease OF detectedDiseases:
    //         FOR EACH department OF possibleDepartmentsOf(disease):
    //             IF possibleDepartments.hasKey(department):
    //                 possibleDepartments[department] += scoreOf(disease)
    //             ELSE:
    //                 possibleDepartments[department] = scoreOf(disease)
    //     RETURN LIST OF possibleDepartments SORTED BY ITS SCORE VALUE

    const departmentScoresByIds = new Map<number, number>();

    for (const { priority: diseasePriority, disease_name, disease_category: { departments } } of queryResults) {
        for (const department of departments) {
            const departmentResponse = await cacheDepartment(department);
            const departmentId = departmentResponse.id;
            const previousScore = departmentScoresByIds.get(departmentId);
            const scoreDelta = scoreOfDisease({
                diseasePriority,
                department: { lat: department.hospital.division.lat, lon: department.hospital.division.lon },
                userLat: lat,
                userLon: lon,
            });
            if (undefined !== previousScore) {
                departmentScoresByIds.set(departmentId, previousScore + scoreDelta);
            } else {
                departmentScoresByIds.set(departmentId, scoreDelta);
            }
            // priority=1 is prior (more prioritized) to priority=2.
            // As such, the lower the score, the more prioritized the disease.
        }
    }

    const results: DepartmentResponse[] = [...departmentsByIds.values()];
    results.sort((a, b) => {
        const aScore = departmentScoresByIds.get(a.id);
        const bScore = departmentScoresByIds.get(b.id);
        if (undefined === aScore) {
            if (undefined === bScore) return 0; // a, b or b, a
            else return 1; // b, a
        } else if (undefined === bScore) {
            return -1; // a, b
        } else {
            return aScore - bScore;
        }
    });

    return results;
}

function scoreOfDisease({ diseasePriority, userLat, userLon, department: { lat, lon } }: {
    diseasePriority: number,
    userLat: number,
    userLon: number,
    department: {
        lat: number,
        lon: number,
    }
}) {
    return diseasePriority + latlonDisance(userLat, userLon, lat, lon) * 0.1;
}

// https://stackoverflow.com/a/21623206/13680015
function latlonDisance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const r = 6371; // km
    const p = Math.PI / 180;

    const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 2 * r * Math.asin(Math.sqrt(a));
}
