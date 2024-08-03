import { Bucket } from "@google-cloud/storage";
import mime from "mime-types";
import path from "path";
import { InputImageNotFoundError, InvalidInputImageLinkError, NotAnImageError } from "../errors";

export async function getImageLinkByItsPathOnFirebase({ filePath, firebaseStorageBucket } : {
    filePath: string,
    firebaseStorageBucket: Bucket,
}): Promise<string> {
    if (!filePath) {
        throw new InvalidInputImageLinkError();
    }

    const fileExtension = path.extname(filePath);
    if (
        !fileExtension
        || !(mime.contentType(fileExtension) || "").startsWith("image/")
    ) {
        throw new NotAnImageError();
    }

    const fileOnFirebase = firebaseStorageBucket.file(filePath);
    // LOL, Google Cloud sucks
    // https://github.com/firebase/firebase-tools/issues/3764#issuecomment-1289479578
    const [fileAlreadyExists] = await fileOnFirebase.exists();
    if (!fileAlreadyExists) {
        throw new InputImageNotFoundError();
    }

    const linkExpirationDate = new Date();
    linkExpirationDate.setDate(linkExpirationDate.getDate() + 3);

    const [imageLink] = await fileOnFirebase.getSignedUrl({
        action: 'read',
        expires: linkExpirationDate,
    });

    return imageLink;
}
