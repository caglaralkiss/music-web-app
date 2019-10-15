import { Environment } from './environment';

const DEV_BASE_URL = `http://localhost:3000/`;

export const getEnvironment = (): Environment => {
    switch (process.env.NODE_ENV) {
        case Environment.Production:
            return Environment.Production;
        case Environment.Development:
            return Environment.Development;
        case Environment.Test:
            return Environment.Test;
        default:
            return Environment.Development;
    }
};

export const getBaseUrl = (): string => {
    const env: Environment = getEnvironment();

    switch (env) {
        case Environment.Production:
            return process.env.BASE_URL;
        case Environment.Development:
            return DEV_BASE_URL;
        case Environment.Test:
            return process.env.TEST_URL;
        default:
            break;
    }
};
