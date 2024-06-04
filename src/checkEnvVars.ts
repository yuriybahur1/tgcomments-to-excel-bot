type EnvKey = keyof NodeJS.ProcessEnv;

export const checkEnvVars = (): void => {
  const requiredEnvVars: EnvKey[] = [
    'BOT_TOKEN',
    'API_ID',
    'API_HASH',
    'SESSION',
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(
        `${envVar} is not defined. Please set your ${envVar} in the environment variables.`,
      );
    }
  });
};
