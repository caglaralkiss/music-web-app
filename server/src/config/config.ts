/**
 * Global configuration of the application.
 */

export enum Environment {
    DEVELOPMENT = 'dev',
    PRODUCTION = 'prod',
}

export interface ConfigParams {
    port: number,
    environment: string,
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

    private _loadConfig(envType: string): void {
        switch (envType) {
            case Environment.DEVELOPMENT:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000
                };
                break;
            case Environment.PRODUCTION:
                this.configParams = {
                    environment: Environment.PRODUCTION,
                    port: 4000
                };
                break;
            default:
                this.configParams = {
                    environment: Environment.DEVELOPMENT,
                    port: 3000
                };
                break;
        }
    }
}
