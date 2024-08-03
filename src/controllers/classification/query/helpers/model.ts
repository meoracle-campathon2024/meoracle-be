import { CLASSIFICATION_MODEL_ENDPOINT } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { Value } from "@sinclair/typebox/value";
import { ListOfDiseasesDetectedByClassificationModel, TListOfDiseasesDetectedByClassificationModel } from "../types";

export async function callClassificationModel(vectorIndexes: Array<{
    vector_index: number,
}>): Promise<ListOfDiseasesDetectedByClassificationModel> {
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
    if (!Value.Check(TListOfDiseasesDetectedByClassificationModel, data)) {
        throw new ModelMalfunctionError('classification', 'invalid response');
    }

    return data as ListOfDiseasesDetectedByClassificationModel;
}
