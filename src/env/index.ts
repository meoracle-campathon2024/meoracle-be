import 'dotenv/config';
import { NumberEnvRequirement, readBooleanEnv, readNonEmptyStringEnv, readNumberEnv, readStringListEnv } from './helpers';

export const DEBUG: boolean = readBooleanEnv('DEBUG');
export const GENERAL_SECRET: string = readNonEmptyStringEnv('GENERAL_SECRET');
export const SERVER_PORT: number = readNumberEnv('SERVER_PORT', NumberEnvRequirement.MUST_BE_POSITIVE_OR_ZERO);

export const BACKEND_URL: string = readNonEmptyStringEnv('BACKEND_URL');

export const FRONTEND_SECRET: string = readNonEmptyStringEnv('FRONTEND_SECRET');
export const FRONTEND_URLS: string[] = readStringListEnv('FRONTEND_URLS', { ignoreEmptySegments: true });

export const CLASSIFICATION_MODEL_ENDPOINT: string = readNonEmptyStringEnv('CLASSIFICATION_MODEL_ENDPOINT');

export const DATABASE_URL: string = readNonEmptyStringEnv('DATABASE_URL');
export const SHADOW_DATABASE_URL: string = readNonEmptyStringEnv('SHADOW_DATABASE_URL');

export const REDIS_URL: string = readNonEmptyStringEnv('REDIS_URL');
