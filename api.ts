type Auth = {
    user_id: number,
};

/**
 * basically QueryResult
 */
type DiseasePrediction = {
    created_at: Date,
    disease_name: string,
};

type ClassificationSymptom = {
    id: number,
    name: string,
};

type ClassificationSymptomGroup = {
    id: number,
    parent_id: number | null,
    tier: number, // level of the group: group 0 = root, group 1 = subgroup of root, etc.
    name: string,
    symptoms: ClassificationSymptom[],
    subgroups: ClassificationSymptomGroup[],
};

type ClassificationModelCallParams = {
    selectedClassificationSymptomIdList: number[];
};

type NlpModelCallParams = {
    queryContent: string,
};

type ImageModelCallParams = {
    userImageFile: File,
};

/**
 * Delete this later
 */
async function _simulateNetworkDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(null), 1000));
}

export async function getClassificationSymptomGroups(auth: Auth): Promise<ClassificationSymptomGroup[]> {
    // Simulate network delay
    await _simulateNetworkDelay();

    return [
        {
            id: 1,
            parent_id: null,
            tier: 0,
            name: 'Chân',
            symptoms: [],
            subgroups: [
                {
                    id: 11,
                    parent_id: 1,
                    tier: 1,
                    name: 'Đầu gối',
                    symptoms: [
                        {
                            id: 110,
                            name: 'Sưng nhưng không đau',
                        },
                    ],
                    subgroups: [
                        {
                            id: 111,
                            parent_id: 11,
                            tier: 2,
                            name: 'Đau đầu gối',
                            symptoms: [
                                {
                                    id: 1111,
                                    name: 'Đau nhưng không sưng',
                                },

                                {
                                    id: 1112,
                                    name: 'Đau và sưng tấy',
                                },
                            ],
                            subgroups: [],
                        },
                    ],
                },

                {
                    id: 12,
                    parent_id: 1,
                    tier: 1,
                    name: 'Mắt cá chân',
                    symptoms: [
                        {
                            id: 120,
                            name: 'Sưng to mắt cá chân',
                        },
                    ],
                    subgroups: [],
                },
            ]
        },

        {
            id: 2,
            parent_id: null,
            tier: 0,
            name: 'Mắt',
            symptoms: [
                {
                    id: 21,
                    name: 'Nổi mạch máu đỏ',
                },

                {
                    id: 22,
                    name: 'Đồng tử giãn',
                },
            ],
            subgroups: []
        },
    ];
}

export async function callClassificationModel(
    auth: Auth,
    { selectedClassificationSymptomIdList }: ClassificationModelCallParams,
): Promise<DiseasePrediction[]> {
    await _simulateNetworkDelay();

    const acceptableIds = [
        110,
        1111,
        1112,
        120,
        21,
        22,
    ];

    for (const selectedClassificationSymptomId of selectedClassificationSymptomIdList) {
        if (!acceptableIds.includes(selectedClassificationSymptomId)) {
            throw new Error(`Invalid ID: ${selectedClassificationSymptomId}`);
        }
    }

    return [
        {
            created_at: new Date(),
            disease_name: 'Trật khớp',
        },

        {
            created_at: new Date(),
            disease_name: 'Chuột rút',
        },

        {
            created_at: new Date(),
            disease_name: 'Đau mắt đỏ',
        },
    ];
}

export async function getPreviousNlpQueryContent(auth: Auth): Promise<string> {
    if (Date.now() % 2 == 0) return "previous nlp query content so that the user doesn't need to retype their prompt";
    return "";
}

export async function callNlpModel(auth: Auth, { queryContent } : NlpModelCallParams): Promise<DiseasePrediction[]> {
    return [
        {
            created_at: new Date(),
            disease_name: 'COVID-19',
        },

        {
            created_at: new Date(),
            disease_name: 'Cúm mùa',
        },

        {
            created_at: new Date(),
            disease_name: 'Cảm lạnh thông thường',
        },
    ];
}

/**
 * Delete this later
 */
export const FakeFileObject = new File(['e'], 'fakeFile.jpg', {
    type: 'image/jpeg',
});

/**
 * For the second param, you can temporarily pass
 * {
 *     userImageFile: FakeFileObject,
 * }
 * to it.
 * 
 * When the HTML image input form is ready, replace
 * it with the real File object containing the input
 * image that the user wants to upload.
 */
export async function callImageModel(auth: Auth, { userImageFile } : ImageModelCallParams): Promise<DiseasePrediction[]> {
    return [
        {
            created_at: new Date(),
            disease_name: 'Thủy đậu',
        },

        {
            created_at: new Date(),
            disease_name: 'Đậu mùa',
        },

        {
            created_at: new Date(),
            disease_name: 'Tay chân miệng',
        },
    ];
}
