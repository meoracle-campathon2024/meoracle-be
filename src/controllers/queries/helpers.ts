import { CLASSIFICATION_MODEL_ID, IMAGE_MODEL_ID, NLP_MODEL_ID } from "@/config";
import { PrismaClient, QueryDetail, QueryResult } from "@prisma/client";
import { InvalidQueryDetailError, QueryDetailNotFoundError, QueryNotOwnedByUserError } from "./errors";
import { QueryResponse } from "@/types/QueryResponse";
import { Value } from "@sinclair/typebox/value";
import { TQueryResultListResponse } from "@/types/QueryResultListResponse";
import { QueryListResponse } from "@/types/QueryListResponse";

export async function getAllQueries({ prisma, userId } : {
    prisma: PrismaClient,
    userId: number,
}): Promise<QueryListResponse> {
    const FIND_BY_USER_ID = {
        where: {
            user_id: userId,
        },
    };

    const [classificationQueries, nlpQueries, imageQueries] = await Promise.all([
        prisma.classificationQuery.findMany({
            ...FIND_BY_USER_ID,
            include: {
                query_detail: {
                    include: {
                        query_results: {
                            orderBy: {
                                priority: 'asc',
                            },
                        },
                    },
                },
                classification_symptoms: true,
            },
        }),

        prisma.nlpQuery.findMany({
            ...FIND_BY_USER_ID,
            include: {
                query_detail: {
                    include: {
                        query_results: {
                            orderBy: {
                                priority: 'asc',
                            },
                        },
                    },
                },
            },
        }),

        prisma.imageQuery.findMany({
            ...FIND_BY_USER_ID,
            include: {
                query_detail: {
                    include: {
                        query_results: {
                            orderBy: {
                                priority: 'asc',
                            },
                        },
                    },
                },
                user_images: true,
            },
        }),
    ]);

    const queryResponses: QueryListResponse = [];
    for (const q of classificationQueries) {
        const qd = q.query_detail;
        queryResponses.push({
            id: qd.id,
            user_id: q.user_id,
            created_at: +qd.created_at,
            model_name: 'classification',
            results: Value.Cast(TQueryResultListResponse, qd.query_results),

            selected_symptoms: q.classification_symptoms,
        });
    }

    for (const q of nlpQueries) {
        const qd = q.query_detail;
        queryResponses.push({
            id: qd.id,
            user_id: q.user_id,
            created_at: +qd.created_at,
            model_name: 'nlp',
            results: Value.Cast(TQueryResultListResponse, qd.query_results),

            query_content: q.query_content,
        });
    }

    for (const q of imageQueries) {
        const qd = q.query_detail;
        queryResponses.push({
            id: qd.id,
            user_id: q.user_id,
            created_at: +qd.created_at,
            model_name: 'image',
            results: Value.Cast(TQueryResultListResponse, qd.query_results),

            uploaded_images: q.user_images,
        });
    }

    queryResponses.sort((a, b) => b.created_at - a.created_at);

    return queryResponses;
}

export async function getQueryById({ prisma, userId, queryDetailId } : {
    prisma: PrismaClient,
    userId: number,
    queryDetailId: number,
}): Promise<QueryResponse> {
    const queryDetailWithResults = await prisma.queryDetail.findUnique({
        where: {
            id: queryDetailId,
        },
        include: {
            query_results: true,
        },
    });

    if (null === queryDetailWithResults) {
        throw new QueryDetailNotFoundError(queryDetailId);
    }

    const queryResponse = await getQueryDetailWithFullQueryData({ prisma, queryDetailWithResults });
    if (userId !== queryResponse.user_id) {
        throw new QueryNotOwnedByUserError(queryDetailId);
    }

    return queryResponse;
}

export async function getQueryDetailWithFullQueryData({ prisma, queryDetailWithResults } : {
    prisma: PrismaClient,
    queryDetailWithResults: QueryDetail & { query_results: QueryResult[] },
}): Promise<QueryResponse> {
    const generalInfo = {
        id: queryDetailWithResults.id,
        created_at: +queryDetailWithResults.created_at,
        results: Value.Cast(TQueryResultListResponse, queryDetailWithResults.query_results),
    };

    switch (queryDetailWithResults.type) {
        case CLASSIFICATION_MODEL_ID:
            {
                const classificationQuery = await prisma.classificationQuery.findUnique({
                    where: {
                        query_detail_id: queryDetailWithResults.id,
                    },
                    include: {
                        classification_symptoms: true,
                    },
                });

                const selected_symptoms = classificationQuery?.classification_symptoms || [];

                return {
                    ...generalInfo,
                    user_id: classificationQuery?.user_id || 0,
                    model_name: 'classification',
                    selected_symptoms,
                };
            }

        case IMAGE_MODEL_ID:
            {
                const imageQuery = await prisma.imageQuery.findUnique({
                    where: {
                        query_detail_id: queryDetailWithResults.id,
                    },
                    include: {
                        user_images: {
                            select: { file_path: true },
                        },
                    },
                });

                const uploaded_images = imageQuery?.user_images || [];

                return {
                    ...generalInfo,
                    user_id: imageQuery?.user_id || 0,
                    model_name: 'image',
                    uploaded_images,
                };
            }

        case NLP_MODEL_ID:
            {
                const nlpQuery = await prisma.nlpQuery.findUnique({
                    where: {
                        query_detail_id: queryDetailWithResults.id,
                    },
                    select: {
                        query_content: true,
                        user_id: true,
                    },
                });

                return {
                    ...generalInfo,
                    user_id: nlpQuery?.user_id || 0,
                    model_name: 'nlp',
                    query_content: nlpQuery?.query_content || "",
                };
            }
        
        default:
            throw new InvalidQueryDetailError();
    }
}
