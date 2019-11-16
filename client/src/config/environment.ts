export enum Environment {
  DEV,
  PROD,
  TEST
}

const RECORD_BY_PROCESS: Record<string, Environment> = {
  'development': Environment.DEV,
  'production': Environment.PROD,
  'test': Environment.TEST
}

export const currEnvironment = (): Environment => {
  // @ts-ignore
  return RECORD_BY_PROCESS[process.env.NODE_ENV]
}
