// env.d.ts
declare namespace Nodejs {
  interface ProcessEnv {
    MONGO_URI: string;
  }
}
