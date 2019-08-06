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
    secret: string
    db?: string,
    hashSalt?: string,
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
        return this.configParams.hashSalt ? this.configParams.hashSalt : 'def*salt*34*12'
    }

    get secret(): string {
        return this.configParams.secret ? this.configParams.secret : 'its*def*secret';
    }

    get url(): string {
        return this.configParams.url;
    }

    private _loadConfig(envType: string): void {
        switch (envType) {
            case Environment.DEVELOPMENT:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000,
                    db: path.resolve('.') + '/.data/',
                    hashSalt: 'salt*my*tequila*123',
                    secret: 'i*am*secret',
                    url: 'http://localhost:3000',
                };
                break;
            case Environment.PRODUCTION:
                this.configParams = {
                    environment: Environment.PRODUCTION,
                    port: 4000,
                    db: path.resolve('.') + '/.data/',
                    hashSalt: process.env.HASH_SALT,
                    secret: process.env.SECRET,
                    url: process.env.URL,
                };
                break;
            default:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000,
                    db: path.resolve('.') + '/.data/',
                    hashSalt: 'salt*my*tequila*123',
                    secret: 'i*am*secret',
                    url: 'http://localhost:3000'
                };
                break;
        }
    }
}
