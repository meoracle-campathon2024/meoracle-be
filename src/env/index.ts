import 'dotenv/config';
import { NumberEnvRequirement, readBooleanEnv, readNonEmptyStringEnv, readNumberEnv, readOptionalStringEnv, readStringListEnv } from './helpers';

type ModelEndpointEnvKeyName = 'CLASSIFICATION_MODEL_ENDPOINT' | 'NLP_MODEL_ENDPOINT' | 'IMAGE_MODEL_ENDPOINT';
function readAIModelEndpointEnv(keyName: ModelEndpointEnvKeyName): string|null {
    const endpoint = readOptionalStringEnv(keyName);
    if (null === endpoint) {
        const modelName
            = keyName === 'CLASSIFICATION_MODEL_ENDPOINT' ? 'classification'
            : keyName === 'NLP_MODEL_ENDPOINT' ? 'nlp'
            : 'image';
        console.info(`Using FAKE "${modelName}" model.`);
    }
    return endpoint;
}

export const DEBUG: boolean = readBooleanEnv('DEBUG');
export const GENERAL_SECRET: string = readNonEmptyStringEnv('GENERAL_SECRET');
export const SERVER_PORT: number = readNumberEnv('SERVER_PORT', NumberEnvRequirement.MUST_BE_POSITIVE_OR_ZERO);

export const BACKEND_URL: string = readNonEmptyStringEnv('BACKEND_URL');

export const FRONTEND_SECRET: string = readNonEmptyStringEnv('FRONTEND_SECRET');
export const FRONTEND_URLS: string[] = readStringListEnv('FRONTEND_URLS', { ignoreEmptySegments: true });

export const CLASSIFICATION_MODEL_ENDPOINT: string|null = readAIModelEndpointEnv('CLASSIFICATION_MODEL_ENDPOINT');
export const NLP_MODEL_ENDPOINT: string|null = readAIModelEndpointEnv('NLP_MODEL_ENDPOINT');
export const IMAGE_MODEL_ENDPOINT: string|null = readAIModelEndpointEnv('IMAGE_MODEL_ENDPOINT');

export const DATABASE_URL: string = readNonEmptyStringEnv('DATABASE_URL');
export const SHADOW_DATABASE_URL: string = readNonEmptyStringEnv('SHADOW_DATABASE_URL');
export const SKIN_CATEGORY_ID: number = readNumberEnv('SKIN_CATEGORY_ID', NumberEnvRequirement.MUST_BE_POSITIVE);

export const REDIS_URL: string = readNonEmptyStringEnv('REDIS_URL');

export const FIREBASE_CLOUD_STORAGE_BUCKET_NAME: string = readNonEmptyStringEnv('FIREBASE_CLOUD_STORAGE_BUCKET_NAME');
export const FIREBASE_CLOUD_STORAGE_KEY_FILENAME: string = readNonEmptyStringEnv('FIREBASE_CLOUD_STORAGE_KEY_FILENAME');
