declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    API_ID: string;
    API_HASH: string;
    SESSION: string;
    NODE_ENV: 'development' | 'production';
  }
}
