// env.d.ts
declare namespace Nodejs {
  interface ProcessEnv {
    MONGO_URI: string;
    FRONTEND_URI_1: string;
    FRONTEND_URI_2: string;
  }
}
