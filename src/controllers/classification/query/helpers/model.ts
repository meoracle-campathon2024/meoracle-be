import { CLASSIFICATION_MODEL_ENDPOINT } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { ListOfDiseasesDetected, TListOfDiseasesDetected } from "@/utils/saveDetectedDiseases/types";
import { Value } from "@sinclair/typebox/value";
import diseaseCate from '../../../../../diseaseCate.json';

export async function callClassificationModel(vectorIndexes: Array<{
    id: number,
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

    const requestPayload = {
        num: 3, // chắc chắn số này là kiểu number
        symptoms: vectorIndexes.map(x => x.id), // chắc chắn đây là mảng số
    };

    // Log request payload
    console.log("Request Payload:", requestPayload);

    const res = await fetch(`${CLASSIFICATION_MODEL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
    }).catch(_$ => null);

    if (res === null) {
        console.log(`${CLASSIFICATION_MODEL_ENDPOINT}`)
        throw new ModelUnavailableError('classification');
    }

    if (res.status !== 200) {
        throw new ModelMalfunctionError('classification', `status ${res.status}`);
    }

    const data = await res.json();
    const indices = data.output[0]; // [78, 600, 200]

    const result = data.output.flatMap((item: any[]) => {
        return item.map((index) => {
          const entry = diseaseCate[index] as unknown as { [key: string]: string };
          const name = Object.keys(entry)[0];
          const category_id = parseInt(entry[name]);
          return { name, category_id };
        });
      });
      
    console.log("Model Response:", result);

    return result;
}
