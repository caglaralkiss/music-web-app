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
    db?: string
}

/**
 * @TODO change db roots on all environments
 */
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

    private _loadConfig(envType: string): void {
        switch (envType) {
            case Environment.DEVELOPMENT:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000,
                    db: path.resolve('.') + '/.data/',
                };
                break;
            case Environment.PRODUCTION:
                this.configParams = {
                    environment: Environment.PRODUCTION,
                    port: 4000,
                    db: path.resolve('.') + '/.data/',
                };
                break;
            default:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000,
                    db: path.resolve('.') + '/.data/',
                };
                break;
        }
    }
}
