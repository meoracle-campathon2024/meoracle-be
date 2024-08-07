import { CLASSIFICATION_MODEL_ENDPOINT } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { ListOfDiseasesDetected, TListOfDiseasesDetected } from "@/utils/saveDetectedDiseases/types";
import { Value } from "@sinclair/typebox/value";

export async function callClassificationModel(vectorIndexes: Array<{
    vector_index: number,
}>): Promise<ListOfDiseasesDetected> {
    if (null === CLASSIFICATION_MODEL_ENDPOINT) {
        await new Promise(resolve => setTimeout(() => resolve(null), 2000));
        return [
            {
                name: 'heart failure',
                category_id: 8,
            },

            ...(Math.random() > 0.3 ? [{
                name: 'hypertension',
                category_id: 8,
            }] : []),

            ...(Math.random() > 0.7 ? [{
                name: 'cataracts',
                category_id: 7,
            }] : []),
        ];
    }

    const res = await fetch(`${CLASSIFICATION_MODEL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            num: 3 satisfies number,
            symptoms: vectorIndexes.map(x => x.vector_index) satisfies number[],
        }),
    }).catch(_$ => null);

    if (res === null) {
        throw new ModelUnavailableError('classification');
    }

    if (res.status !== 200) {
        throw new ModelMalfunctionError('classification', `status ${res.status}`);
    }

    const data = await res.json();
    if (!Value.Check(TListOfDiseasesDetected, data)) {
        throw new ModelMalfunctionError('classification', 'invalid response');
    }

    return data as ListOfDiseasesDetected;
}
