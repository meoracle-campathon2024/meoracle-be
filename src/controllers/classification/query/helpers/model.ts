import { CLASSIFICATION_MODEL_ENDPOINT } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { ListOfDiseasesDetected, TListOfDiseasesDetected } from "@/utils/saveDetectedDiseases/types";
import { Value } from "@sinclair/typebox/value";

export async function callClassificationModel(vectorIndexes: Array<{
    vector_index: number,
}>): Promise<ListOfDiseasesDetected> {
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
