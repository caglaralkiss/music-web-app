/**
 * Global configuration of the application.
 */

import * as path from "path";

export enum Environment {
    DEVELOPMENT = 'dev',
    PRODUCTION = 'prod',
}

export interface ConfigParams {
    port: number,
    environment: string,
    db?: string,
    hashSalt?: string,
    secret: string
    url?: string
}

export class Config {
    private static instance: Config;
    private configParams: ConfigParams;

    private constructor() {
        this._loadConfig(process.env.NODE_ENV);
    }

    static getInstance(): Config {
        if (!Config.instance) {
            return new Config();
        }

        return Config.instance;
    }

    get port(): number {
        return this.configParams.port;
    }

    get environment(): string {
        return this.configParams.environment;
    }

    get db(): string {
        return this.configParams.db;
    }

    get hashSalt(): string {
        return this.configParams.hashSalt;
    }

    get secret(): string {
        return this.configParams.secret;
    }

    get url(): string {
        return this.configParams.url;
    }

    private _loadConfig(envType: string): void {
        const common: Partial<ConfigParams> = {
            db: path.resolve('.') + '/.data/',
            port: process.env.PORT ? Number(process.env.PORT) : 3000,
            secret: process.env.SECRET ? process.env.SECRET : 'i*am*secret'
        };

        switch (envType) {
            case Environment.PRODUCTION:
                this.configParams = {
                    ...common as ConfigParams,
                    environment: Environment.PRODUCTION,
                    hashSalt: process.env.HASH_SALT || 'def*salt*34*12',
                    url: process.env.URL + ':' + common.port,
                };
                break;
            default:
                this.configParams = {
                    ...common as ConfigParams,
                    environment: Environment.DEVELOPMENT,
                    hashSalt: 'salt*my*tequila*123',
                    url: 'http://localhost:' + common.port,
                };
                break;
        }
    }
}
