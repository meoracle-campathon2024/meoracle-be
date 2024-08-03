import { Value } from "@sinclair/typebox/value";
import { IMAGE_MODEL_ENDPOINT, SKIN_CATEGORY_ID } from "@/env";
import { ModelMalfunctionError, ModelUnavailableError } from "@/errors";
import { ListOfDiseasesDetected } from "@/utils/saveDetectedDiseases/types";
import { Static, Type } from "@sinclair/typebox";

const TListOfDiseasesDetectedByImageModel = Type.Array(Type.String());
type ListOfDiseasesDetectedByImageModel = Static<typeof TListOfDiseasesDetectedByImageModel>;

export async function callImageQueryModel({ imageLinks } : {
    imageLinks: string[],
}): Promise<ListOfDiseasesDetected> {
    const res = await fetch(`${IMAGE_MODEL_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_links: imageLinks satisfies string[],
        }),
    }).catch(_$ => null);

    if (res === null) {
        throw new ModelUnavailableError('image');
    }

    if (res.status !== 200) {
        throw new ModelMalfunctionError('image', `status ${res.status}`);
    }

    const data = await res.json();
    if (!Value.Check(TListOfDiseasesDetectedByImageModel, data)) {
        throw new ModelMalfunctionError('image', 'invalid response');
    }

    const diseasesDetected = data as ListOfDiseasesDetectedByImageModel;
    return diseasesDetected.map(name => {
        return {
            name,
            category_id: SKIN_CATEGORY_ID,
        };
    });
}
