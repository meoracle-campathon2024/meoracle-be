import { FIREBASE_CLOUD_STORAGE_BUCKET_NAME, FIREBASE_CLOUD_STORAGE_KEY_FILENAME } from "@/env";
import { Storage } from "@google-cloud/storage";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { cert, initializeApp } from "firebase-admin/app";

initializeApp({
    credential: cert(FIREBASE_CLOUD_STORAGE_KEY_FILENAME),
    storageBucket: FIREBASE_CLOUD_STORAGE_BUCKET_NAME,
});

export const firebaseStoragePlugin = fastifyPlugin(async (server: FastifyInstance) => {
    const firebaseStorage = new Storage({
        keyFilename: FIREBASE_CLOUD_STORAGE_KEY_FILENAME,
    });

    const firebaseStorageBucket = firebaseStorage.bucket(FIREBASE_CLOUD_STORAGE_BUCKET_NAME);

    server.decorate('firebaseStorage', firebaseStorage);
    server.decorate('firebaseStorageBucket', firebaseStorageBucket);
});
