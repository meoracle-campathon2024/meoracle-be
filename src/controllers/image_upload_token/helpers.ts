import { init as cuid2Init } from "@paralleldrive/cuid2";
import { getAuth } from "firebase-admin/auth";

const createFileId = cuid2Init({
    length: 24,
});

export async function createImageUploadToken({ userId } : {
    userId: number,
}): Promise<{
    token: string,
    file_id: string,
}> {
    const file_id = createFileId();

    const token = await getAuth().createCustomToken(`user-${userId}`, { file_id });

    return { token, file_id };
}
