import { NLP_MODEL_ENDPOINT } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { ListOfDiseasesDetected, TListOfDiseasesDetected } from "@/utils/saveDetectedDiseases/types";
import { Value } from "@sinclair/typebox/value";

export async function callNlpModel({ queryContent } : {
    queryContent: string,
}): Promise<ListOfDiseasesDetected> {
    if (null === NLP_MODEL_ENDPOINT) {
        return [
            {
                name: 'panic disorder',
                category_id: 1,
            },

            ...(Math.random() > 0.4 ? [{
                name: 'insomnia',
                category_id: 1,
            }] : []),
        ];
    }

    const res = await fetch(`${NLP_MODEL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: queryContent,
        }),
    }).catch(_$ => null);

    if (res === null) {
        throw new ModelUnavailableError('nlp');
    }

    if (res.status !== 200) {
        throw new ModelMalfunctionError('nlp', `status ${res.status}`);
    }

    const data = await res.json();
    if (!Value.Check(TListOfDiseasesDetected, data)) {
        throw new ModelMalfunctionError('nlp', 'invalid response');
    }

    return data as ListOfDiseasesDetected;
}
